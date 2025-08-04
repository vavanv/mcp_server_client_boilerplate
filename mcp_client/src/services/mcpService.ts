import { MCPResponse, Company } from "../types";

const MCP_SERVER_URL =
  import.meta.env.VITE_MCP_SERVER_URL || "http://localhost:3100/mcp";

export class MCPService {
  private parseSSEResponse(sseText: string): any {
    try {
      // SSE format: "event: message\ndata: {json}\n\n"
      const lines = sseText.split("\n");
      const dataLines: string[] = [];

      for (const line of lines) {
        if (line.startsWith("data: ")) {
          dataLines.push(line.substring(6)); // Remove "data: " prefix
        }
      }

      if (dataLines.length > 0) {
        // Join all data lines in case JSON is split across multiple lines
        const jsonData = dataLines.join("");
        return JSON.parse(jsonData);
      }

      throw new Error("No data found in SSE response");
    } catch (error) {
      console.error("Error parsing SSE response:", error);
      console.error("SSE text:", sseText);
      throw new Error(
        `Failed to parse SSE response: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }
  async testConnection(): Promise<boolean> {
    try {
      // Use the health endpoint to test connection
      let healthUrl: string;

      if (MCP_SERVER_URL.startsWith("/api/")) {
        // Using Vite proxy - construct proxy health URL
        healthUrl = "/api/health";
      } else {
        // Direct URL - extract base URL and construct health endpoint
        const url = new URL(MCP_SERVER_URL);
        healthUrl = `${url.protocol}//${url.host}/health`;
      }

      console.log("Testing connection to health endpoint:", healthUrl);

      const response = await fetch(healthUrl, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });

      console.log("Health check response status:", response.status);

      if (!response.ok) {
        throw new Error(`Health check failed with status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Health check response:", data);

      return true;
    } catch (error) {
      console.error("Connection test failed:", error);
      return false;
    }
  }
  private async makeRequest(
    method: string,
    params?: any
  ): Promise<MCPResponse> {
    const requestBody = {
      jsonrpc: "2.0",
      id: Date.now(),
      method,
      params: params || {},
    };

    console.log("MCP Request:", {
      url: MCP_SERVER_URL,
      method: "POST",
      body: requestBody,
    });

    try {
      const response = await fetch(MCP_SERVER_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json, text/event-stream",
        },
        body: JSON.stringify(requestBody),
      });

      console.log("MCP Response status:", response.status);
      console.log(
        "MCP Response headers:",
        Object.fromEntries(response.headers.entries())
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("MCP Error response:", errorText);
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${errorText}`
        );
      }

      const contentType = response.headers.get("content-type");
      console.log("Response content-type:", contentType);

      if (contentType?.includes("text/event-stream")) {
        // Handle Server-Sent Events (SSE) response
        const text = await response.text();
        console.log("SSE Response text:", text);

        // Parse SSE format to extract JSON data
        const data = this.parseSSEResponse(text);
        console.log("Parsed SSE data:", data);

        if (data.error) {
          throw new Error(data.error.message || "MCP Server error");
        }

        return data.result;
      } else {
        // Handle regular JSON response
        const data = await response.json();
        console.log("JSON Response data:", data);

        if (data.error) {
          throw new Error(data.error.message || "MCP Server error");
        }

        return data.result;
      }
    } catch (error) {
      console.error("MCP Service error:", error);
      if (error instanceof TypeError && error.message.includes("fetch")) {
        throw new Error(
          `Network error: Cannot connect to MCP server at ${MCP_SERVER_URL}. Check if the server is running and CORS is configured.`
        );
      }
      throw error;
    }
  }

  async getCompanies(): Promise<Company[]> {
    try {
      const response = await this.makeRequest("tools/call", {
        name: "getCompanies",
        arguments: {},
      });

      // Parse the JSON response from the MCP server
      const responseText = response.content[0]?.text;
      if (responseText) {
        const parsedData = JSON.parse(responseText);
        return parsedData.companies || [];
      }
      return [];
    } catch (error) {
      console.error("Error fetching companies:", error);
      throw error;
    }
  }

  async getChats(companyName: string): Promise<any[]> {
    try {
      const response = await this.makeRequest("tools/call", {
        name: "getChats",
        arguments: { companyName },
      });

      const responseText = response.content[0]?.text;
      if (responseText) {
        const parsedData = JSON.parse(responseText);
        return parsedData.chats || [];
      }
      return [];
    } catch (error) {
      console.error("Error fetching chats:", error);
      throw error;
    }
  }

  async getLLMs(companyName: string): Promise<any[]> {
    try {
      const response = await this.makeRequest("tools/call", {
        name: "getLLMs",
        arguments: { companyName },
      });

      const responseText = response.content[0]?.text;
      if (responseText) {
        const parsedData = JSON.parse(responseText);
        return parsedData.llms || [];
      }
      return [];
    } catch (error) {
      console.error("Error fetching LLMs:", error);
      throw error;
    }
  }
}

export const mcpService = new MCPService();
