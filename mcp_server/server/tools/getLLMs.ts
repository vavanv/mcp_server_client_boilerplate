import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import prisma from "../../src/lib/prisma";
import z from "zod";

export function registerGetLLMsTool(server: McpServer) {
  server.tool(
    "getLLMs",
    "Get list of LLM(s) for a company",
    {
      companyName: z
        .string()
        .describe("The name of the company to get list of LLM(s) for"),
    },
    {
      title: "Get LLM(s)",
      readOnlyHint: true,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: true,
    },
    async (args: { companyName: string }) => {
      try {
        const llms = await prisma.llm.findMany({
          where: {
            company: {
              company: args.companyName,
            },
          },
          include: {
            company: {
              select: {
                company: true,
                description: true,
              },
            },
          },
        });

        if (llms.length === 0) {
          return {
            content: [
              {
                type: "text",
                text: `No LLMs found for company: ${args.companyName}`,
              },
            ],
          };
        }

        return {
          content: [{ type: "text", text: JSON.stringify(llms, null, 2) }],
        };
      } catch (error) {
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
      }
    }
  );
}
