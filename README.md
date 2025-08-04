# MCP Server Client Boilerplate

A comprehensive Model Context Protocol (MCP) implementation featuring a TypeScript server with AI company data tools and a modern React client with OpenAI integration.

## Overview

This project demonstrates a complete MCP ecosystem with:

- **MCP Server**: A TypeScript-based server providing tools for querying AI company information from a PostgreSQL database
- **MCP Client**: A modern React application with Material-UI components, OpenAI integration, and real-time chat functionality

## Server Component (`mcp_server`)

### Features

- **Database Integration**: Uses Prisma ORM with PostgreSQL to store and retrieve AI company and model data
- **MCP Tools**: Provides comprehensive tools for querying AI company information:
  - `getCompanies`: Retrieves all companies with their chatbots and LLM models
  - `getChats`: Gets chatbots for a specific company
  - `getLLMs`: Gets LLM models for a specific company
  - `diagnostic`: Health check and diagnostic tool
- **Type Safety**: Built with TypeScript for robust development experience
- **Database Seeding**: Includes comprehensive AI company data from CSV files
- **Docker Support**: Containerized deployment with health checks
- **Express Integration**: HTTP server with health endpoints
- **MCP Inspector**: Built-in debugging and inspection tools

### Database Schema

The application uses a relational schema with three main entities:

- **Company**: Stores AI company information (id, company name, description) with one-to-many relationships
- **Chat**: Stores chatbot information (chatbot name) linked to companies
- **LLM**: Stores LLM model information with specializations linked to companies

### Quick Start (Server)

1. **Install dependencies:**

   ```bash
   cd mcp_server
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
   yarn prisma:migrate
   yarn prisma:seed
   ```

4. **Run the server:**
   ```bash
   yarn dev
   ```

### Available Scripts (Server)

- `yarn dev` - Start development server with hot reload
- `yarn build` - Build TypeScript to JavaScript
- `yarn start` - Start production server
- `yarn inspect` - Launch MCP Inspector for debugging
- `yarn inspect:unsafe` - Launch MCP Inspector without authentication
- `yarn prisma:studio` - Open Prisma Studio database GUI
- `yarn prisma:seed-chats` - Seed additional chat data
- `yarn prisma:populate-chats` - Populate chat relationships

### Docker Deployment

```bash
cd mcp_server
docker-compose build
docker-compose up -d
```

## Client Component (`mcp_client`)

### Features

- **React 19 Application**: Built with the latest React and TypeScript for type safety
- **Vite Build Tool**: Lightning-fast development with instant HMR and optimized builds
- **Material-UI v7**: Modern UI components with custom styling architecture
- **OpenAI Integration**: Direct integration with OpenAI API for chat functionality
- **MCP Service Integration**: Connects to MCP server for AI company data retrieval
- **Real-time Chat Interface**: Interactive chat with suggested questions and message history
- **Component Architecture**: Clean separation of concerns with custom styling hooks
- **Error Handling**: Comprehensive error handling with user-friendly alerts
- **Connection Status**: Real-time MCP server connection monitoring

### Key Components

- **Chat**: Main chat interface with message handling and OpenAI integration
- **Header**: Application header with connection status indicators
- **MessageList**: Scrollable message history with user/assistant message styling
- **ChatInput**: Multi-line input with keyboard shortcuts (Enter to send, Shift+Enter for new line)
- **SuggestedQuestions**: Pre-defined questions to help users get started
- **ErrorAlert**: User-friendly error display and handling

### Quick Start (Client)

1. **Install dependencies:**

   ```bash
   cd mcp_client
   npm install
   ```

2. **Set up environment (optional):**

   ```bash
   # Create .env.local file for OpenAI API key:
   VITE_OPENAI_API_KEY=your_openai_api_key_here
   ```

3. **Development server:**

   ```bash
   npm run dev
   ```

4. **Production build:**
   ```bash
   npm run build
   npm run preview
   ```

The development server will be available at `http://localhost:5173` with instant hot module replacement.

## Project Structure

```
mcp_server_client_boilerplate/
├── mcp_server/              # MCP Server with database tools
│   ├── server/              # Server implementation
│   │   ├── server.ts        # Main server entry point
│   │   └── tools/           # MCP tool implementations
│   ├── prisma/              # Database schema and migrations
│   │   ├── schema.prisma    # Database schema definition
│   │   ├── migrations/      # Database migration files
│   │   └── seed-lastone.*   # Database seeding scripts
│   ├── scripts/             # Utility scripts for data population
│   ├── docker-compose.yml   # Docker configuration
│   ├── Dockerfile           # Docker image definition
│   └── package.json         # Server dependencies
├── mcp_client/              # React client application (Vite)
│   ├── src/                 # React source code
│   │   ├── main.tsx         # Application entry point
│   │   ├── App.tsx          # Main app component
│   │   ├── Chat.tsx         # Main chat interface
│   │   ├── components/      # Reusable UI components
│   │   │   ├── *Styles.tsx  # Component styling hooks
│   │   │   └── *.tsx        # Component implementations
│   │   ├── services/        # API and service integrations
│   │   │   ├── mcpService.ts    # MCP server communication
│   │   │   └── openaiService.ts # OpenAI API integration
│   │   ├── types/           # TypeScript type definitions
│   │   └── constants.ts     # Application constants
│   ├── index.html           # HTML entry point
│   ├── vite.config.ts       # Vite configuration
│   ├── tsconfig.json        # TypeScript configuration
│   └── package.json         # Client dependencies
└── README.md               # This file
```

## Technologies Used

### Server

- **MCP SDK**: `@modelcontextprotocol/sdk` v1.17.1 for building MCP servers
- **Prisma**: Database ORM v6.13.0 for PostgreSQL
- **TypeScript**: Type-safe JavaScript development v5.9.2
- **PostgreSQL**: Relational database for data storage
- **Express**: HTTP server framework v5.1.0
- **Docker**: Containerization for deployment
- **Zod**: Runtime type validation v3.25.67
- **Faker.js**: Test data generation v9.9.0

### Client

- **React 19**: Latest React v19.1.1 with concurrent features
- **Vite 7**: Next-generation frontend tooling v7.0.6 with instant HMR
- **TypeScript 5.9**: Latest TypeScript v5.9.2 with advanced type features
- **Material-UI v7**: Modern React UI component library v7.2.0
- **Emotion**: CSS-in-JS styling v11.14.0
- **OpenAI**: Direct API integration v5.11.0
- **ESLint 9**: Code quality and consistency v9.32.0
- **npm**: Package management

## Sample Data

The server includes comprehensive AI company data with:

- **22+ unique companies** (OpenAI, Google, Meta AI, Anthropic, Cohere, etc.)
- **Chat platforms** (ChatGPT, Gemini, Claude, Copilot, etc.)
- **LLM models** with specializations (GPT-4, PaLM 2, LLaMA, Claude-3, etc.)

## How It Works

### MCP Integration Flow

1. **Client Request**: User asks a question about AI companies
2. **OpenAI Processing**: Client sends query to OpenAI with function calling enabled
3. **MCP Tool Invocation**: OpenAI determines which MCP tools to call based on the query
4. **Server Query**: MCP client calls the appropriate server endpoints
5. **Database Retrieval**: Server queries PostgreSQL database using Prisma
6. **Response Assembly**: Data is returned through the MCP protocol
7. **AI Response**: OpenAI generates a natural language response using the retrieved data

### Architecture Benefits

- **Separation of Concerns**: MCP server handles data, client handles UI/UX
- **Type Safety**: End-to-end TypeScript ensures robust development
- **Real-time Updates**: Instant feedback on connection status and errors
- **Scalable Design**: Easy to add new tools and extend functionality

## Development

### Client Development with Vite

Built with Vite for superior development experience:

**Performance Benefits:**

- **Lightning Fast Startup**: Dev server starts in ~400ms
- **Instant HMR**: Hot Module Replacement updates in milliseconds
- **Optimized Builds**: Modern bundling with tree-shaking and code splitting
- **Native ESM**: Leverages browser's native ES modules for faster loading

**Modern Architecture:**

- **Component Styling**: Separated styling logic using custom hooks
- **Service Layer**: Clean separation between UI and API logic
- **Error Boundaries**: Comprehensive error handling throughout the app
- **TypeScript Integration**: Full type safety across all components

### Adding New Tools (Server)

1. Create new tool file in `server/tools/`
2. Implement the tool following the MCP SDK patterns
3. Register the tool in `server/tools/index.ts`
4. Export the registration function

Example tool structure:

```typescript
export const registerMyTool = (server: Server) => {
  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    // Tool implementation
  });
};
```

### Database Changes (Server)

1. Modify `prisma/schema.prisma`
2. Run: `yarn prisma:migrate` to create migration
3. Update client: `yarn prisma:generate`
4. Update seed data if needed

### Customizing Components (Client)

1. **Components**: Modify files in `src/components/`
2. **Styles**: Update corresponding `*Styles.tsx` files
3. **Types**: Update type definitions in `src/types/`
4. **Services**: Extend API integrations in `src/services/`

### Adding New UI Features

The client uses a clean architecture pattern:

- **Styling**: Use custom hooks (e.g., `useMessageListStyles`)
- **State Management**: React hooks with proper TypeScript typing
- **API Integration**: Extend `mcpService.ts` or `openaiService.ts`

## Testing

### Server Testing

- **MCP Inspector**: `yarn inspect` (interactive tool debugging)
- **MCP Inspector (Unsafe)**: `yarn inspect:unsafe` (no auth required)
- **Health Check**: `GET http://localhost:3100/health`
- **Direct Tool Testing**: Use Postman with JSON-RPC requests

### Client Testing

- **Development Server**: `npm run dev` (runs on http://localhost:5173 with HMR)
- **Production Build**: `npm run build` (TypeScript compilation + Vite build)
- **Preview Build**: `npm run preview` (preview production build on http://localhost:4173)
- **Linting**: `npm run lint` (ESLint code quality checks)
- **Manual Testing**: Test MCP server connection, OpenAI integration, and chat functionality

## Getting Started (Full Setup)

### Prerequisites

- Node.js 18+ and npm/yarn
- PostgreSQL database
- OpenAI API key (optional, for client chat functionality)

### Complete Setup

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd mcp_server_client_boilerplate
   ```

2. **Setup MCP Server:**

   ```bash
   cd mcp_server
   yarn install
   # Create .env with DATABASE_URL
   yarn prisma:generate
   yarn prisma:migrate
   yarn prisma:seed
   yarn dev
   ```

3. **Setup MCP Client (in new terminal):**

   ```bash
   cd mcp_client
   npm install
   # Create .env.local with VITE_OPENAI_API_KEY (optional)
   npm run dev
   ```

4. **Access the application:**
   - Client: http://localhost:5173
   - Server health: http://localhost:3100/health
   - MCP Inspector: `yarn inspect` (from server directory)

## Configuration

### Environment Variables

**Server (.env):**

```bash
DATABASE_URL="postgresql://username:password@localhost:5432/database_name"
PORT=3100
NODE_ENV=development
```

**Client (.env.local):**

```bash
VITE_OPENAI_API_KEY=your_openai_api_key_here
```

## Troubleshooting

### Common Issues

1. **MCP Server Connection Failed**: Ensure server is running on port 3100
2. **Database Connection Error**: Check PostgreSQL is running and DATABASE_URL is correct
3. **OpenAI API Error**: Verify API key is set and has sufficient credits
4. **Port Conflicts**: Client runs on 5173, server on 3100 - ensure ports are available

## License

ISC (Server) / MIT (Client)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test both server and client thoroughly
5. Submit a pull request with detailed description
