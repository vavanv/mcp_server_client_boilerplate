# My MCP Project

A comprehensive Model Context Protocol (MCP) implementation consisting of a server that provides AI company data tools and a React client application.

## Overview

This project demonstrates a complete MCP ecosystem with:

- **MCP Server**: A TypeScript-based server that provides tools for querying AI company information from a PostgreSQL database
- **MCP Client**: A React application built with TypeScript and Material-UI components

## Server Component (`my_first_mcp_server`)

### Features

- **Database Integration**: Uses Prisma ORM with PostgreSQL to store and retrieve AI company and model data
- **MCP Tools**: Provides tools for querying AI company information:
  - `getCompanies`: Retrieves all companies with their chats and LLMs
  - `getChats`: Gets chatbots for a specific company
  - `getLLMs`: Gets LLM models for a specific company
- **Type Safety**: Built with TypeScript for better development experience
- **Database Seeding**: Includes comprehensive AI company data from CSV
- **Docker Support**: Containerized deployment with health checks

### Database Schema

The application uses a relational schema with three main entities:

- **Company**: Stores AI company information with one-to-many relationships to chats and LLMs
- **Chat**: Stores chatbot information linked to companies
- **LLM Model**: Stores LLM model information with specializations linked to companies

### Quick Start (Server)

1. **Install dependencies:**

   ```bash
   cd my_first_mcp_server
   yarn install
   ```

2. **Set up environment:**

   ```bash
   # Create .env file with:
   DATABASE_URL="postgresql://username:password@localhost:5432/your_database_name"
   PORT=3100
   NODE_ENV=development
   ```

3. **Setup database:**

   ```bash
   yarn prisma:generate
   npx prisma migrate dev
   yarn prisma:seed
   ```

4. **Run the server:**
   ```bash
   yarn server:dev
   ```

### Docker Deployment

```bash
docker-compose build
docker-compose up -d
```

## Client Component (`my_first_mcp_client`)

### Features

- **React Application**: Built with TypeScript for type safety
- **Material-UI**: Modern UI components using MUI
- **Custom Components**: Includes reusable MUI-based components

### Quick Start (Client)

1. **Install dependencies:**

   ```bash
   cd my_first_mcp_client
   npm install
   ```

2. **Run the application:**
   ```bash
   npm start
   ```

The application will be available at `http://localhost:3000`.

## Project Structure

```
my-mcp/
├── my_first_mcp_server/     # MCP Server with database tools
│   ├── server/              # Server implementation
│   ├── prisma/              # Database schema and migrations
│   ├── docker-compose.yml   # Docker configuration
│   └── package.json         # Server dependencies
├── my_first_mcp_client/     # React client application
│   ├── src/                 # React source code
│   ├── public/              # Static assets
│   └── package.json         # Client dependencies
└── README.md               # This file
```

## Technologies Used

### Server

- **MCP SDK**: `@modelcontextprotocol/sdk` for building MCP servers
- **Prisma**: Database ORM for PostgreSQL
- **TypeScript**: Type-safe JavaScript development
- **PostgreSQL**: Relational database for data storage
- **Docker**: Containerization for deployment

### Client

- **React**: Frontend framework
- **TypeScript**: Type-safe JavaScript development
- **Material-UI**: UI component library
- **npm**: Package management

## Sample Data

The server includes comprehensive AI company data with:

- **22 unique companies** (OpenAI, Google, Meta AI, Anthropic, etc.)
- **Chat platforms** (ChatGPT, Gemini, Claude, etc.)
- **LLM models** with specializations (GPT-4, PaLM 2, LLaMA, etc.)

## Development

### Adding New Tools (Server)

Create new files in `server/tools/` and register them in `server/tools/index.ts`.

### Database Changes (Server)

1. Modify `prisma/schema.prisma`
2. Run: `npx prisma migrate dev --name migration_name`
3. Update client: `yarn prisma:generate`

### Customizing Components (Client)

Modify components in `src/components/` and update types in `src/types/`.

## Testing

### Server Testing

- **MCP Inspector**: `yarn server:inspect`
- **Postman**: Use JSON-RPC requests to test tools
- **Health Check**: `GET http://localhost:3100/health`

### Client Testing

- **Development Server**: `npm start` (runs on http://localhost:3000)
- **Build**: `npm run build`

## License

ISC (Server) / MIT (Client)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request
