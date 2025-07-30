import express, { Request, Response } from "express";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import {
  registerGetCompaniesTool,
  registerGetChatsTool,
  registerGetLLMsTool,
  registerDiagnosticTool,
} from "./tools";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

function getServer() {
  const server = new McpServer({
    name: "AI Companies MCP Server",
    version: "1.0.0",
    description:
      "A server that provides tools for querying AI company information",
    capabilities: {
      tools: {},
    },
  });

  // Register all tools
  registerGetCompaniesTool(server);
  registerGetChatsTool(server);
  registerGetLLMsTool(server);
  registerDiagnosticTool(server);

  return server;
}

const app = express();
app.use(express.json());

// Health check endpoint
app.get("/health", (req: Request, res: Response) => {
  res.json({ status: "ok", message: "MCP Server is running" });
});

app.post("/mcp", async (req: Request, res: Response) => {
  try {
    const server = getServer();
    const transport = new StreamableHTTPServerTransport({
      sessionIdGenerator: undefined,
    });

    res.on("close", () => {
      console.log("Server closed");
      transport.close();
      server.close();
    });

    await server.connect(transport);
    console.log("MCP Server connected successfully");

    await transport.handleRequest(req, res, req.body);
  } catch (error) {
    console.error("Error handling MCP request:", error);
    if (!res.headersSent) {
      res.json({
        jsonrpc: "2.0",
        error: {
          code: -32603,
          message: "Internal server error",
        },
        id: null,
      });
    }
  }
});

// Start the server
const PORT = process.env.PORT || 3100;

// Debug: Log environment variables (remove in production)
console.log("Environment variables:");
console.log("DATABASE_URL:", process.env.DATABASE_URL ? "Set" : "Not set");
console.log("PORT:", PORT);
console.log("NODE_ENV:", process.env.NODE_ENV);

app.listen(PORT, () => {
  console.log(`MCP Stateless Streamable HTTP Server listening on port ${PORT}`);
});
