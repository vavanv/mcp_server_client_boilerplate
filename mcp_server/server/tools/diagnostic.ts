import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import prisma from "../../src/lib/prisma";

export function registerDiagnosticTool(server: McpServer) {
  server.tool("diagnostic", "Get database diagnostic information", async () => {
    try {
      console.log("Diagnostic tool called");

      // Test database connection
      await prisma.$connect();
      console.log("Database connection successful");

      // Get various counts
      const companyCount = await prisma.company.count();
      const chatCount = await prisma.chat.count();
      const llmCount = await prisma.llm.count();

      // Get sample companies
      const sampleCompanies = await prisma.company.findMany({
        take: 5,
        select: {
          id: true,
          company: true,
          description: true,
          _count: {
            select: {
              chats: true,
              llms: true,
            },
          },
        },
      });

      const diagnostic = {
        database: {
          connection: "Connected",
          companyCount,
          chatCount,
          llmCount,
        },
        environment: {
          databaseUrl: process.env.DATABASE_URL ? "Set" : "Not set",
          nodeEnv: process.env.NODE_ENV || "Not set",
          port: process.env.PORT || 3100,
        },
        sampleCompanies: sampleCompanies.map((c) => ({
          company: c.company,
          chats: c._count.chats,
          llms: c._count.llms,
        })),
      };

      return {
        content: [{ type: "text", text: JSON.stringify(diagnostic, null, 2) }],
      };
    } catch (error) {
      console.error("Error in diagnostic tool:", error);
      return {
        content: [
          {
            type: "text",
            text: `Diagnostic Error: ${
              error instanceof Error ? error.message : String(error)
            }`,
          },
        ],
      };
    } finally {
      await prisma.$disconnect();
    }
  });
}
