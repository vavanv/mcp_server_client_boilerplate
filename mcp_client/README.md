# MCP Client - AI Companies Chatbot

A modern, modular React-based chatbot interface that connects to the MCP server and uses OpenAI to provide intelligent responses about AI companies and their products. Built with TypeScript, Material-UI, and following React best practices.

## Features

### 🤖 **AI-Powered Chat Interface**

- **Multi-line text input** for complex questions
- **Real-time responses** using OpenAI GPT-3.5-turbo
- **Context-aware answers** based on MCP server data
- **Suggested questions** to get started quickly

### 🔗 **MCP Server Integration**

- **Live connection status** indicator
- **Real-time data fetching** from MCP server
- **Company information** including chatbots and LLM models
- **Error handling** for server connectivity issues

### 🎨 **Modern UI/UX**

- **Material-UI components** for professional appearance
- **Modular component architecture** with reusable UI components
- **Responsive design** that works on all screen sizes
- **Message history** with timestamps and auto-scrolling
- **Loading indicators** and real-time status chips
- **Smooth animations** and intuitive interactions
- **CORS-free operation** using Vite proxy configuration

## Setup Instructions

### 1. **Install Dependencies**

```bash
cd mcp_client
npm install
```

### 2. **Configure OpenAI API Key**

1. Copy the environment template:

   ```bash
   cp .env.example .env
   ```

2. Get your OpenAI API key from [OpenAI Platform](https://platform.openai.com/api-keys)

3. Edit `.env` file and add your API key:
   ```env
   VITE_OPENAI_API_KEY=sk-your-actual-api-key-here
   ```

### 3. **Start MCP Server**

Make sure your MCP server is running on `http://localhost:3100`:

```bash
cd ../mcp_server
npm run server:dev
```

### 4. **Start the Chatbot**

```bash
npm run dev
```

The chatbot will be available at `http://localhost:3000` (or next available port)

> **Note**: The application uses Vite proxy to handle CORS issues with the MCP server, so no additional CORS configuration is needed.

## Usage

### **Getting Started**

1. **Check Connection**: Look for the "Connected" status chip in the header
2. **Try Suggested Questions**: Click on any suggested question chip to get started
3. **Ask Your Own Questions**: Type in the multi-line text box and press Enter or click Send

### **Example Questions**

- "What AI companies are available?"
- "Tell me about OpenAI's products"
- "Which companies offer chatbots?"
- "What LLM models does Google have?"
- "Compare Anthropic and OpenAI"
- "Show me all companies with their chatbots"

### **Features in Action**

- **Multi-line Input**: Hold Shift+Enter for new lines, Enter to send
- **Real-time Responses**: AI processes your question with current MCP data
- **Context Awareness**: AI knows about all companies, chatbots, and LLMs in the database
- **Error Handling**: Clear error messages if something goes wrong

## Architecture

### **Modular Component Structure**

The application follows React best practices with a modular component architecture:

#### **Main Components**

- **App**: Root application component that provides the main layout structure
- **Chat**: Main chat orchestrator component that manages chat state and coordinates UI components

#### **UI Components** (in `src/components/`)

- **Header**: Displays app branding, connection status, and OpenAI configuration status
- **ErrorAlert**: Flexible alert component for displaying errors, warnings, and notifications
- **SuggestedQuestions**: Interactive component showing clickable question suggestions
- **MessageList**: Handles message display, scrolling, and loading states
- **ChatInput**: Input component with Enter key handling, loading states, and validation

#### **Services**

- **MCPService**: Handles communication with MCP server, including SSE response parsing
- **OpenAIService**: Manages OpenAI API integration with context-aware prompts
- **Constants**: Centralized configuration management for URLs and settings

#### **Type Safety**

- **TypeScript interfaces** for all components and data structures
- **Strict typing** for props, state, and API responses
- **Type-safe** MCP and OpenAI integrations

### **File Structure**

```
src/
├── App.tsx                    # Root application component
├── Chat.tsx                   # Main chat component
├── components/                # Reusable UI components
│   ├── Header.tsx            # App header with status indicators
│   ├── ErrorAlert.tsx        # Flexible alert/notification component
│   ├── SuggestedQuestions.tsx # Interactive question suggestions
│   ├── MessageList.tsx       # Chat message display and scrolling
│   └── ChatInput.tsx         # Message input with validation
├── services/                  # Business logic services
│   ├── mcpService.ts         # MCP server communication
│   └── openaiService.ts      # OpenAI API integration
├── types/                     # TypeScript type definitions
│   └── index.ts              # All interface definitions
├── constants.ts               # Configuration constants
└── main.tsx                   # Application entry point
```

### **Data Flow**

1. User asks a question in the Chat component
2. Chat component sends question to OpenAIService
3. OpenAIService fetches current data from MCPService
4. OpenAI processes question with MCP data context
5. Response is displayed through the MessageList component

### **MCP Tools Used**

- **getCompanies**: Retrieves all companies with their products
- **getChats**: Gets chatbots for specific companies
- **getLLMs**: Gets LLM models for specific companies

## Configuration

### **Environment Variables**

```env
# Required: OpenAI API key
VITE_OPENAI_API_KEY=sk-your-api-key

# Optional: Custom MCP server URL (default: http://localhost:3100/mcp)
# When using proxy (recommended): /api/mcp
# When using direct connection: http://localhost:3100/mcp
VITE_MCP_SERVER_URL=/api/mcp
```

### **Configuration Management**

All configuration is centralized in `src/constants.ts`:

- **Server URLs**: Configurable host, port, and endpoints
- **OpenAI Settings**: Model, tokens, temperature
- **API Endpoints**: Proxy paths for CORS-free operation
- **Environment Variables**: Type-safe access to env vars

### **OpenAI Settings** (configurable in `constants.ts`)

- **Model**: GPT-3.5-turbo (easily upgradeable to GPT-4)
- **Max Tokens**: 1000
- **Temperature**: 0.7 (balanced creativity/accuracy)

## Troubleshooting

### **Common Issues**

1. **"Disconnected" Status**

   - Ensure MCP server is running on port 3100
   - Check server logs for errors
   - Verify database connection
   - Check if proxy configuration is working

2. **"OpenAI Not Configured" Warning**

   - Add your OpenAI API key to `.env` file
   - Restart the development server
   - Check API key validity

3. **CORS Errors**

   - Ensure `VITE_MCP_SERVER_URL=/api/mcp` in `.env`
   - Verify Vite proxy configuration in `vite.config.ts`
   - Check browser console for proxy errors

4. **SSE/Streaming Errors**

   - Check if MCP server supports Server-Sent Events
   - Verify Accept headers include `text/event-stream`
   - Check browser console for parsing errors

5. **No Response from AI**

   - Check browser console for errors
   - Verify OpenAI API key is correct
   - Check network connectivity
   - Ensure MCP server is returning data

6. **Build Errors**
   - Run `npm install --legacy-peer-deps`
   - Clear node_modules and reinstall
   - Check TypeScript errors

## Development

### **Adding New Features**

1. **New MCP Tools**: Add to `src/services/mcpService.ts`
2. **UI Components**: Create reusable components in `src/components/`
3. **Main Components**: Add new main components at `src/` level (same as `Chat.tsx`)
4. **AI Prompts**: Modify in `src/services/openaiService.ts`
5. **Types**: Update `src/types/index.ts`
6. **Configuration**: Add new constants to `src/constants.ts`

### **Component Development Guidelines**

- **Single Responsibility**: Each component should have one clear purpose
- **Reusability**: Design components to be reusable across the app
- **File Organization**:
  - Main components (like `Chat.tsx`) go in `src/` root level
  - Reusable UI components go in `src/components/`
  - Services go in `src/services/`
- **TypeScript**: Use strict typing for all props and state
- **Material-UI**: Follow Material-UI design patterns
- **Props Interface**: Define clear interfaces for all component props

### **Testing**

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint
```

## Security Notes

⚠️ **Important**: This implementation uses `dangerouslyAllowBrowser: true` for OpenAI client. In production:

- Use a backend proxy for OpenAI API calls
- Never expose API keys in client-side code
- Implement proper authentication and rate limiting

## Recent Improvements

### **Component Modularization** ✅

- Extracted Header, ErrorAlert, SuggestedQuestions, MessageList, and ChatInput components
- Renamed ChatInterface to Chat and moved to root level (same as App.tsx)
- Reduced main chat component from ~248 lines to ~123 lines (50% reduction)
- Improved maintainability and reusability with clear component hierarchy

### **Configuration Management** ✅

- Centralized all configuration in `src/constants.ts`
- Removed hardcoded URLs throughout the codebase
- Type-safe environment variable access

### **CORS Resolution** ✅

- Implemented Vite proxy configuration
- Eliminated CORS issues with MCP server
- Seamless development experience

### **SSE Support** ✅

- Added Server-Sent Events parsing for MCP responses
- Handles both JSON and streaming responses
- Robust error handling for different response formats

### **File Structure Optimization** ✅

- Renamed ChatInterface to Chat for better naming convention
- Moved Chat.tsx to root level (same as App.tsx) for logical hierarchy
- Clear separation between main components and reusable UI components
- Improved import paths and project organization

## Next Steps

- [ ] Add user authentication and session management
- [ ] Implement conversation persistence with local storage
- [ ] Add more MCP tools integration (file operations, etc.)
- [ ] Create backend proxy for OpenAI (production security)
- [ ] Add conversation export/import functionality
- [ ] Implement real-time collaboration features
- [ ] Add unit tests for all components
- [ ] Create Storybook documentation for components
- [ ] Add performance monitoring and analytics
