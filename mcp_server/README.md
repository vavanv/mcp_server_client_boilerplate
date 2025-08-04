# MCP Server

A Model Context Protocol (MCP) server that provides tools for querying AI company information from a PostgreSQL database. This server demonstrates how to build MCP tools that interact with a database using Prisma ORM.

## Features

- **Database Integration**: Uses Prisma ORM with PostgreSQL to store and retrieve AI company and model data
- **MCP Tools**: Provides tools for querying AI company information:
  - `getCompanies`: Retrieves all companies with their chats and LLMs
  - `getChats`: Gets chatbots for a specific company
  - `getLLMs`: Gets LLM models for a specific company
- **Type Safety**: Built with TypeScript for better development experience
- **Database Seeding**: Includes comprehensive AI company data from CSV
- **Docker Support**: Containerized deployment with health checks
- **Environment Configuration**: Proper .env file support with dotenv

## Database Schema

The application uses a relational schema with three main entities:

### Company Model

- **id**: Unique identifier (CUID)
- **company**: Company name (unique)
- **description**: Company description and details
- **chats**: One-to-many relationship with Chat model
- **llms**: One-to-many relationship with LLM model
- **createdAt/updatedAt**: Timestamps

### Chat Model

- **id**: Unique identifier (CUID)
- **chatbot**: Chatbot name
- **companyId**: Foreign key reference to Company
- **company**: Relation to Company model
- **createdAt/updatedAt**: Timestamps
- **Unique constraint**: [chatbot, companyId]

### LLM Model

- **id**: Unique identifier (CUID)
- **llm**: LLM model name
- **specialization**: LLM specialization/description
- **companyId**: Foreign key reference to Company
- **company**: Relation to Company model
- **createdAt/updatedAt**: Timestamps
- **Unique constraint**: [llm, companyId]

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database
- Yarn or npm package manager

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd my_first_mcp_server
```

2. Install dependencies:

```bash
yarn install
```

3. Set up your environment variables by creating a `.env` file:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/your_database_name"
PORT=3100
NODE_ENV=development
```

4. Generate Prisma client:

```bash
yarn prisma:generate
```

5. Run database migrations:

```bash
npx prisma migrate dev
```

6. Seed the database with AI company data from CSV:

```bash
yarn prisma:seed
```

## Usage

### Development Mode

Start the server in development mode:

```bash
yarn server:dev
```

The server will start on port 3100 and load environment variables from the `.env` file.

### Docker Deployment

Build and run the server using Docker:

```bash
# Build the Docker image
docker-compose build

# Start the container
docker-compose up -d

# Check logs
docker-compose logs -f

# Stop the container
docker-compose down
```

### Building for Production

Build the TypeScript code:

```bash
yarn server:build
```

### Testing with MCP Inspector

Test the server using the MCP Inspector:

```bash
yarn server:inspect
```

For development without authentication:

```bash
yarn server:inspect2
```

### Database Management

- **Prisma Studio**: Open a web interface to view and edit database data:

```bash
yarn prisma:studio
```

- **Generate Prisma Client**: After schema changes:

```bash
yarn prisma:generate
```

### Testing with Postman

You can test the MCP server using Postman with JSON-RPC requests:

#### 1. Health Check

- **Method**: `GET`
- **URL**: `http://localhost:3100/health`

#### 2. Get All Tools

- **Method**: `POST`
- **URL**: `http://localhost:3100/mcp`
- **Headers**: `Content-Type: application/json`
- **Body**:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/list"
}
```

#### 3. Get All Companies

- **Method**: `POST`
- **URL**: `http://localhost:3100/mcp`
- **Headers**: `Content-Type: application/json`
- **Body**:

```json
{
  "jsonrpc": "2.0",
  "id": 2,
  "method": "tools/call",
  "params": {
    "name": "getCompanies",
    "arguments": {}
  }
}
```

#### 4. Get Chats for a Company

- **Method**: `POST`
- **URL**: `http://localhost:3100/mcp`
- **Headers**: `Content-Type: application/json`
- **Body**:

```json
{
  "jsonrpc": "2.0",
  "id": 3,
  "method": "tools/call",
  "params": {
    "name": "getChats",
    "arguments": {
      "companyName": "OpenAI"
    }
  }
}
```

#### 5. Get LLMs for a Company

- **Method**: `POST`
- **URL**: `http://localhost:3100/mcp`
- **Headers**: `Content-Type: application/json`
- **Body**:

```json
{
  "jsonrpc": "2.0",
  "id": 4,
  "method": "tools/call",
  "params": {
    "name": "getLLMs",
    "arguments": {
      "companyName": "OpenAI"
    }
  }
}
```

## Available Tools

### getCompanies

Retrieves all companies with their associated chats and LLMs.

**Parameters**: None

**Returns**: JSON array of all companies with their properties, chats, and LLMs.

### getChats

Gets chatbots for a specific company.

**Parameters**:

- `companyName` (string): The name of the company to get chatbots for

**Returns**: JSON array of chatbots for the specified company.

### getLLMs

Gets LLM models for a specific company.

**Parameters**:

- `companyName` (string): The name of the company to get LLMs for

**Returns**: JSON array of LLM models for the specified company.

## Sample Data

The database is populated with comprehensive AI company data including:

- **22 unique companies** (OpenAI, Google, Meta AI, Anthropic, etc.)
- **Chat platforms** (ChatGPT, Gemini, Claude, etc.)
- **LLM models** with specializations (GPT-4, PaLM 2, LLaMA, etc.)

Example data structure:

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
```

## Project Structure

```
my_first_mcp_server/
├── server/
│   ├── server.ts          # Main MCP server implementation
│   └── tools/
│       ├── index.ts       # Tool registration exports
│       ├── getCompanies.ts # Tool for getting all companies
│       ├── getChats.ts    # Tool for getting chats by company
│       └── getLLMs.ts     # Tool for getting LLMs by company
├── src/
│   └── lib/
│       └── prisma.ts      # Prisma client configuration
├── prisma/
│   ├── schema.prisma      # Database schema definition
│   ├── seed-lastone.ts    # Database seeding script for AI companies
│   ├── seed-lastone.js    # JavaScript version of seeding script
│   ├── lastone.csv        # AI company data source
│   └── migrations/        # Database migration files
├── docker-compose.yml     # Docker Compose configuration
├── Dockerfile            # Docker container definition
├── docker-run.sh         # Docker run script
├── package.json          # Project dependencies and scripts
├── tsconfig.json         # TypeScript configuration
└── .env                  # Environment variables (create this file)
```

## Development

### Adding New Tools

To add a new MCP tool, create a new file in `server/tools/` and register it in `server/tools/index.ts`:

```typescript
// server/tools/newTool.ts
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import z from "zod";

export function registerNewTool(server: McpServer) {
  server.tool(
    "newTool",
    "Tool description",
    {
      // Parameter schema using Zod
      paramName: z.string().describe("Parameter description"),
    },
    {
      // Tool metadata
      title: "Tool Title",
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: false,
      openWorldHint: true,
    },
    async (args) => {
      // Tool implementation
      return {
        content: [{ type: "text", text: "Result" }],
      };
    }
  );
}
```

Then register it in `server/server.ts`:

```typescript
import { registerNewTool } from "./tools";

// In the getServer() function:
registerNewTool(server);
```

### Database Changes

1. Modify `prisma/schema.prisma`
2. Generate a new migration:

```bash
npx prisma migrate dev --name migration_name
```

3. Update the Prisma client:

```bash
yarn prisma:generate
```

### Seeding New Data

To seed the database with new AI company data:

1. Update the CSV file (`prisma/lastone.csv`)
2. Run the seed script:

```bash
yarn prisma:seed
```

## Technologies Used

- **MCP SDK**: `@modelcontextprotocol/sdk` for building MCP servers
- **Prisma**: Database ORM for PostgreSQL
- **TypeScript**: Type-safe JavaScript development
- **Zod**: Schema validation for tool parameters
- **PostgreSQL**: Relational database for data storage
- **Express**: Web server framework
- **Docker**: Containerization for deployment
- **dotenv**: Environment variable management

## Troubleshooting

### Common Issues

#### 1. DATABASE_URL Environment Variable Not Found

**Error**: `Environment variable not found: DATABASE_URL`

**Solution**:

- Ensure you have created a `.env` file in the project root
- Check that the `.env` file contains the correct `DATABASE_URL`
- Restart the server after creating/modifying the `.env` file

#### 2. Docker 502 Bad Gateway

**Error**: `502 Bad Gateway` when accessing the server via Docker

**Solutions**:

- Check Docker logs: `docker-compose logs -f`
- Ensure the `.env` file is properly configured
- Rebuild the Docker image: `docker-compose build --no-cache`
- Check if the database is accessible from the container

#### 3. Database Connection Issues

**Error**: Database connection failures

**Solutions**:

- Verify PostgreSQL is running
- Check database credentials in `DATABASE_URL`
- Run migrations: `npx prisma migrate dev`
- Generate Prisma client: `npx prisma generate`

#### 4. Port Already in Use

**Error**: `EADDRINUSE` when starting the server

**Solution**:

- Change the port in `.env` file: `PORT=3101`
- Or kill the process using the port: `lsof -ti:3100 | xargs kill -9`

### Debug Mode

To enable debug logging, set `NODE_ENV=development` in your `.env` file. The server will log environment variables and connection status.

## License

ISC

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request
