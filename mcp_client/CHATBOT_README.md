# MCP Chatbot Client

A React-based chatbot interface that connects to the MCP server and uses OpenAI to provide intelligent responses about AI companies and their products.

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
- **Responsive design** that works on all screen sizes
- **Message history** with timestamps
- **Loading indicators** and status chips
- **Smooth scrolling** and animations

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

The chatbot will be available at `http://localhost:3000`

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

### **Components**
- **ChatInterface**: Main chat component with message history
- **MCPService**: Handles communication with MCP server
- **OpenAIService**: Manages OpenAI API integration
- **Types**: TypeScript interfaces for type safety

### **Data Flow**
1. User asks a question
2. ChatInterface sends question to OpenAIService
3. OpenAIService fetches current data from MCPService
4. OpenAI processes question with MCP data context
5. Response is displayed in the chat interface

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
VITE_MCP_SERVER_URL=http://localhost:3100/mcp
```

### **OpenAI Settings**
- **Model**: GPT-3.5-turbo (configurable in `openaiService.ts`)
- **Max Tokens**: 1000
- **Temperature**: 0.7 (balanced creativity/accuracy)

## Troubleshooting

### **Common Issues**

1. **"Disconnected" Status**
   - Ensure MCP server is running on port 3100
   - Check server logs for errors
   - Verify database connection

2. **"OpenAI Not Configured" Warning**
   - Add your OpenAI API key to `.env` file
   - Restart the development server
   - Check API key validity

3. **No Response from AI**
   - Check browser console for errors
   - Verify OpenAI API key is correct
   - Check network connectivity

4. **Build Errors**
   - Run `npm install --legacy-peer-deps`
   - Clear node_modules and reinstall
   - Check TypeScript errors

## Development

### **Adding New Features**
1. **New MCP Tools**: Add to `mcpService.ts`
2. **UI Components**: Create in `src/components/`
3. **AI Prompts**: Modify in `openaiService.ts`
4. **Types**: Update `src/types/index.ts`

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

## Next Steps

- [ ] Add user authentication
- [ ] Implement conversation persistence
- [ ] Add more MCP tools integration
- [ ] Create backend proxy for OpenAI
- [ ] Add conversation export/import
- [ ] Implement real-time collaboration
