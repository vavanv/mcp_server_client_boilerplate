import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import prisma from "../../src/lib/prisma";
import z from "zod";

export function registerGetChatsTool(server: McpServer) {
  server.tool(
    "getChats",
    "Get chatbot(s) for a company",
    {
      companyName: z
        .string()
        .describe("The name of the company to get chatbot(s) for"),
    },
    {
      title: "Get Chatbot(s)",
      readOnlyHint: true,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: true,
    },
    async (args: { companyName: string }) => {
      try {
        const chats = await prisma.chat.findMany({
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

        if (chats.length === 0) {
          return {
            content: [
              {
                type: "text",
                text: `No chatbots found for company: ${args.companyName}`,
              },
            ],
          };
        }

        return {
          content: [{ type: "text", text: JSON.stringify(chats, null, 2) }],
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
