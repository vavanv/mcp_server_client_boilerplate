import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import prisma from "../../src/lib/prisma";

export function registerGetCompaniesTool(server: McpServer) {
  server.tool("getCompanies", "Get the list of companies", async () => {
    try {
      // Add debugging information
      console.log("getCompanies tool called");

      // Test database connection
      await prisma.$connect();
      console.log("Database connection successful");

      // Get total count for debugging
      const totalCount = await prisma.company.count();
      console.log(`Total companies in database: ${totalCount}`);

      const companies = await prisma.company.findMany({
        include: {
          chats: true,
          llms: true,
        },
      });

      console.log(`Retrieved ${companies.length} companies with relations`);

      // Add debugging info to response
      const response = {
        debug: {
          totalCompanies: totalCount,
          retrievedCompanies: companies.length,
          databaseUrl: process.env.DATABASE_URL ? "Set" : "Not set",
          nodeEnv: process.env.NODE_ENV || "Not set",
        },
        companies: companies,
      };

      return {
        content: [{ type: "text", text: JSON.stringify(response, null, 2) }],
      };
    } catch (error) {
      console.error("Error in getCompanies tool:", error);
      return {
        content: [
          {
            type: "text",
            text: `Error: ${
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
