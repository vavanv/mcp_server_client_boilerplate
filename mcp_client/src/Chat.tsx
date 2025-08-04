import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { ChatMessage } from "./types";
import { openaiService } from "./services/openaiService";
import { mcpService } from "./services/mcpService";
import { MCP_SERVER_URL } from "./constants";
import Header from "./components/Header";
import ErrorAlert from "./components/ErrorAlert";
import SuggestedQuestions from "./components/SuggestedQuestions";
import MessageList from "./components/MessageList";
import ChatInput from "./components/ChatInput";

const Chat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Test MCP server connection on component mount
    testConnection();
  }, []);

  const testConnection = async () => {
    try {
      const isConnected = await mcpService.testConnection();
      if (isConnected) {
        setIsConnected(true);
        setError(null);
      } else {
        throw new Error("Connection test failed");
      }
    } catch (err) {
      setIsConnected(false);
      setError(
        `Cannot connect to MCP server. Make sure it's running on ${MCP_SERVER_URL}. Check browser console for details.`
      );
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);
    setError(null);

    try {
      const response = await openaiService.processUserQuestion(
        userMessage.content
      );

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const suggestedQuestions = [
    "What AI companies are available?",
    "Tell me about OpenAI's products",
    "Which companies offer chatbots?",
    "What LLM models does Google have?",
    "Compare Anthropic and OpenAI",
  ];

  const handleSuggestedQuestion = (question: string) => {
    setInputValue(question);
  };

  return (
    <Box
      sx={{ height: "100vh", display: "flex", flexDirection: "column", p: 2 }}
    >
      {/* Header */}
      <Header isConnected={isConnected} />

      {/* Error Alert */}
      <ErrorAlert message={error} onClose={() => setError(null)} />

      {/* Suggested Questions */}
      <SuggestedQuestions
        questions={suggestedQuestions}
        onQuestionClick={handleSuggestedQuestion}
        show={messages.length === 0}
      />

      {/* Messages */}
      <MessageList messages={messages} isLoading={isLoading} />

      {/* Input */}
      <ChatInput
        value={inputValue}
        onChange={setInputValue}
        onSend={handleSendMessage}
        disabled={!isConnected}
        loading={isLoading}
        placeholder="Ask about AI companies, chatbots, or LLM models..."
      />
    </Box>
  );
};

export default Chat;
