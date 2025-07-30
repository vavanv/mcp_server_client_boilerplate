# Building an AI Company Database with Model Context Protocol (MCP)

## Introduction

In the rapidly evolving landscape of artificial intelligence, keeping track of AI companies, their products, and technological offerings has become increasingly complex. This article explores how to build a **Model Context Protocol (MCP) server** that provides structured access to AI company information through a PostgreSQL database.

## What is Model Context Protocol (MCP)?

Model Context Protocol is an open standard that enables AI assistants to interact with external data sources and tools through a standardized interface. MCP servers act as bridges between AI models and various data sources, providing a consistent way for AI assistants to query and retrieve information.

Our project demonstrates how to create an MCP server that:

- Stores AI company information in a PostgreSQL database
- Provides tools for querying company data, chatbots, and LLM models
- Offers a RESTful API interface for external applications
- Supports both development and production deployments via Docker

## Project Overview

The **AI Companies MCP Server** is a TypeScript-based application that serves as a comprehensive database of AI companies and their technological offerings. It provides three main tools:

1. **`getCompanies`** - Retrieves all companies with their associated products
2. **`getChats`** - Gets chatbots for a specific company
3. **`getLLMs`** - Gets LLM models for a specific company

## Technical Architecture

### Database Schema

The application uses a relational database design with three main entities:

```sql
-- Companies table
Company {
  id: String (CUID)
  company: String (unique)
  description: String
  chats: Chat[]
  llms: Llm[]
  createdAt: DateTime
  updatedAt: DateTime
}

-- Chatbots table
Chat {
  id: String (CUID)
  chatbot: String
  companyId: String (foreign key)
  company: Company (relation)
  createdAt: DateTime
  updatedAt: DateTime
}

-- LLM Models table
Llm {
  id: String (CUID)
  llm: String
  specialization: String
  companyId: String (foreign key)
  company: Company (relation)
  createdAt: DateTime
  updatedAt: DateTime
}
```

### Technology Stack

- **Backend**: Node.js with TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Protocol**: Model Context Protocol (MCP)
- **API**: Express.js with JSON-RPC
- **Containerization**: Docker with health checks
- **Validation**: Zod for parameter validation

## Implementation Details

### 1. MCP Server Setup

The core of our application is the MCP server implementation:

```typescript
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import dotenv from "dotenv";

// Load environment variables
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

  // Register tools
  registerGetCompaniesTool(server);
  registerGetChatsTool(server);
  registerGetLLMsTool(server);

  return server;
}
```

### 2. Tool Implementation

Each tool is implemented as a separate module with proper parameter validation:

```typescript
// Example: getChats tool
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
```

### 3. Database Integration

The application uses Prisma ORM for type-safe database operations:

```typescript
// src/lib/prisma.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default prisma;
```

### 4. API Endpoints

The server exposes two main endpoints:

- **Health Check**: `GET /health` - Verifies server status
- **MCP Interface**: `POST /mcp` - Handles JSON-RPC requests

## Deployment Strategies

### Development Mode

For local development, the server can be run directly:

```bash
# Install dependencies
yarn install

# Set up environment variables
echo 'DATABASE_URL="postgresql://user:pass@localhost:5432/ai_companies_db"' > .env

# Run database migrations
npx prisma migrate dev

# Start development server
yarn server:dev
```

### Docker Deployment

For production deployment, the application is containerized:

```dockerfile
# Dockerfile
FROM node:24
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npx prisma generate
RUN npm run server:build
EXPOSE 3100
CMD ["/app/start.sh"]
```

```yaml
# docker-compose.yml
services:
  mcp-server:
    build: .
    ports:
      - "3100:3100"
    environment:
      - DATABASE_URL=${DATABASE_URL}
      - NODE_ENV=production
    env_file:
      - .env
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3100/health"]
      interval: 30s
      timeout: 10s
      retries: 3
```

## API Usage Examples

### Testing with Postman

The server accepts JSON-RPC requests for tool interactions:

#### 1. Get All Companies

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "getCompanies",
    "arguments": {}
  }
}
```

#### 2. Get Chats for OpenAI

```json
{
  "jsonrpc": "2.0",
  "id": 2,
  "method": "tools/call",
  "params": {
    "name": "getChats",
    "arguments": {
      "companyName": "OpenAI"
    }
  }
}
```

#### 3. Get LLMs for Google

```json
{
  "jsonrpc": "2.0",
  "id": 3,
  "method": "tools/call",
  "params": {
    "name": "getLLMs",
    "arguments": {
      "companyName": "Google"
    }
  }
}
```

## Sample Data Structure

The database contains comprehensive information about AI companies:

```
OpenAI:
  - Chats: ChatGPT
  - LLMs: GPT-3, GPT-3.5, GPT-4, GPT-4o, GPT-4o mini, GPT-4.5 Orion

Google:
  - Chats: Gemini (formerly Bard)
  - LLMs: BERT, PaLM 2, Gemini, Gemma

Anthropic:
  - Chats: Claude
  - LLMs: Claude, Claude 3, Claude 4.0 Opus Thinking

Meta AI:
  - Chats: Meta AI Assistant
  - LLMs: LLaMA, LLaMA 2, Code Llama, Llama 3
```

## Benefits of This Approach

### 1. Structured Data Access

- Provides consistent API for accessing AI company information
- Enables AI assistants to query specific company data
- Maintains data relationships and integrity

### 2. Scalability

- Docker containerization enables easy deployment
- Database-driven approach allows for easy data updates
- Modular tool architecture supports adding new features

### 3. Integration Capabilities

- MCP standard enables integration with various AI assistants
- JSON-RPC interface allows for programmatic access
- RESTful health endpoints for monitoring

### 4. Developer Experience

- TypeScript provides type safety
- Prisma ORM offers excellent developer tooling
- Comprehensive error handling and logging

## Use Cases

### 1. AI Assistant Integration

AI assistants can use this MCP server to:

- Answer questions about AI companies
- Provide information about specific chatbots or LLMs
- Compare different AI offerings

### 2. Research and Analysis

Researchers can:

- Query company information programmatically
- Analyze trends in AI development
- Track new AI products and models

### 3. Educational Purposes

Students and educators can:

- Learn about different AI companies
- Understand the AI landscape
- Explore various AI technologies

## Future Enhancements

### 1. Additional Tools

- Company comparison tools
- Trend analysis capabilities
- Product release tracking

### 2. Enhanced Data

- Real-time data updates
- Integration with external APIs
- User-generated content

### 3. Advanced Features

- Authentication and authorization
- Rate limiting
- Caching mechanisms

## Conclusion

This MCP server demonstrates how to build a practical application using the Model Context Protocol. By combining modern web technologies with a structured database approach, we've created a system that provides valuable AI company information through a standardized interface.

The project showcases:

- **Modern Development Practices**: TypeScript, Docker, and proper environment management
- **Database Design**: Relational schema with proper relationships
- **API Design**: JSON-RPC interface following MCP standards
- **Deployment**: Containerized deployment with health checks
- **Documentation**: Comprehensive setup and usage instructions

This approach can be extended to other domains, making it a valuable template for building MCP servers that provide structured access to various types of data.

## Resources

- [Model Context Protocol Documentation](https://modelcontextprotocol.io/)
- [Prisma ORM Documentation](https://www.prisma.io/docs)
- [Docker Documentation](https://docs.docker.com/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

---

_This article demonstrates how to build a practical MCP server for AI company data. The complete source code and documentation are available in the project repository._
