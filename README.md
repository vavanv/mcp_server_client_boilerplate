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

- **React 19 Application**: Built with the latest React and TypeScript for type safety
- **Vite Build Tool**: Lightning-fast development with instant HMR and optimized builds
- **Material-UI v7**: Modern UI components using the latest MUI
- **Custom Components**: Includes reusable MUI-based components with proper TypeScript integration
- **Modern Development**: ESNext modules, latest TypeScript features, and ESLint integration

### Quick Start (Client)

1. **Install dependencies:**

   ```bash
   cd my_first_mcp_client
   npm install
   ```

2. **Development server:**

   ```bash
   npm run dev
   ```

3. **Production build:**
   ```bash
   npm run build
   npm run preview
   ```

The development server will be available at `http://localhost:3000` with instant hot module replacement.

## Project Structure

```
mcp_server_client_boilerplate/
├── mcp_server/              # MCP Server with database tools
│   ├── server/              # Server implementation
│   ├── prisma/              # Database schema and migrations
│   ├── src/                 # TypeScript source files
│   ├── docker-compose.yml   # Docker configuration
│   └── package.json         # Server dependencies
├── mcp_client/              # React client application (Vite)
│   ├── src/                 # React source code
│   │   ├── main.tsx         # Application entry point
│   │   ├── App.tsx          # Main app component
│   │   └── components/      # Reusable components
│   ├── index.html           # HTML entry point
│   ├── vite.config.ts       # Vite configuration
│   ├── tsconfig.json        # TypeScript configuration
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

- **React 19**: Latest React with concurrent features
- **Vite 7**: Next-generation frontend tooling with instant HMR
- **TypeScript 5.9**: Latest TypeScript with advanced type features
- **Material-UI v7**: Modern React UI component library
- **ESLint 9**: Code quality and consistency with latest rules
- **npm**: Package management

## Sample Data

The server includes comprehensive AI company data with:

- **22 unique companies** (OpenAI, Google, Meta AI, Anthropic, etc.)
- **Chat platforms** (ChatGPT, Gemini, Claude, etc.)
- **LLM models** with specializations (GPT-4, PaLM 2, LLaMA, etc.)

## Development

### Client Development with Vite

The client has been migrated from Create React App to Vite for superior development experience:

**Performance Benefits:**

- **Lightning Fast Startup**: Dev server starts in ~400ms vs several seconds with CRA
- **Instant HMR**: Hot Module Replacement updates in milliseconds
- **Optimized Builds**: Modern bundling with tree-shaking and code splitting
- **Native ESM**: Leverages browser's native ES modules for faster loading

**Modern Features:**

- **React 19**: Latest React with concurrent features and improved performance
- **TypeScript 5.9**: Advanced type checking with latest language features
- **ESLint 9**: Modern linting rules for code quality
- **Material-UI v7**: Latest UI components with improved theming

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

- **Development Server**: `npm run dev` (runs on http://localhost:3000 with HMR)
- **Production Build**: `npm run build` (TypeScript compilation + Vite build)
- **Preview Build**: `npm run preview` (preview production build on http://localhost:4173)
- **Linting**: `npm run lint` (ESLint code quality checks)

## Migration Notes

### Vite Migration (Latest Update)

The client has been successfully migrated from Create React App to Vite:

**What Changed:**

- Replaced `react-scripts` with Vite build tool
- Updated to React 19 and latest dependencies
- Restructured entry points (`index.tsx` → `main.tsx`)
- Moved `index.html` from `public/` to root directory
- Added modern TypeScript configuration for Vite
- Implemented ESLint 9 with updated rules

**Breaking Changes:**

- Development command changed from `npm start` to `npm run dev`
- Build output now in `dist/` instead of `build/`
- New preview command: `npm run preview` for testing production builds

**Benefits:**

- 10x faster development server startup
- Instant hot module replacement
- Smaller bundle sizes with better tree-shaking
- Modern development experience with latest tooling

## License

ISC (Server) / MIT (Client)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request
