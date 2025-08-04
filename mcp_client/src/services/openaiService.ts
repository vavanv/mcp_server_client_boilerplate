import OpenAI from "openai";
import { mcpService } from "./mcpService";
import { ENV, OPENAI_CONFIG } from "../constants";

export class OpenAIService {
  private openai: OpenAI | null = null;

  constructor() {
    // Initialize OpenAI client if API key is provided
    const apiKey = ENV.OPENAI_API_KEY;
    if (apiKey) {
      this.openai = new OpenAI({
        apiKey,
        dangerouslyAllowBrowser: true, // Note: In production, use a backend proxy
      });
    }
  }

  async processUserQuestion(question: string): Promise<string> {
    if (!this.openai) {
      return "OpenAI API key not configured. Please set VITE_OPENAI_API_KEY in your environment variables.";
    }

    try {
      // First, get context from MCP server
      const companies = await mcpService.getCompanies();

      // Create context for the AI
      const context = this.createContext(companies);

      // Create the system prompt
      const systemPrompt = `You are an AI assistant that helps users find information about AI companies and their products.

You have access to the following data about AI companies:
${context}

When users ask questions, use this data to provide accurate and helpful responses. If the question is about a specific company, you can also suggest using the MCP tools to get more detailed information about their chatbots or LLM models.

Available MCP tools:
- getCompanies: Get all companies with their chats and LLMs
- getChats(companyName): Get chatbots for a specific company
- getLLMs(companyName): Get LLM models for a specific company

Be helpful, accurate, and suggest relevant companies or products based on the user's question.`;

      const completion = await this.openai.chat.completions.create({
        model: OPENAI_CONFIG.MODEL,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: question },
        ],
        max_tokens: OPENAI_CONFIG.MAX_TOKENS,
        temperature: OPENAI_CONFIG.TEMPERATURE,
      });

      return (
        completion.choices[0]?.message?.content ||
        "Sorry, I could not generate a response."
      );
    } catch (error) {
      console.error("OpenAI Service error:", error);
      return `Error processing your question: ${
        error instanceof Error ? error.message : "Unknown error"
      }`;
    }
  }

  private createContext(companies: any[]): string {
    if (!companies || companies.length === 0) {
      return "No company data available.";
    }

    return companies
      .map((company) => {
        const chats =
          company.chats?.map((chat: any) => chat.chatbot).join(", ") || "None";
        const llms =
          company.llms
            ?.map((llm: any) => `${llm.llm} (${llm.specialization})`)
            .join(", ") || "None";

        return `Company: ${company.company}
Description: ${company.description}
Chatbots: ${chats}
LLM Models: ${llms}`;
      })
      .join("\n\n");
  }

  isConfigured(): boolean {
    return this.openai !== null;
  }
}

export const openaiService = new OpenAIService();
