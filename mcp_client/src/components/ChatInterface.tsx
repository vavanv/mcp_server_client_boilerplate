import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Paper,
  Typography,
  CircularProgress,
  Alert,
  Chip,
  Stack,
} from "@mui/material";
import { Send as SendIcon, Psychology as SmartIcon } from "@mui/icons-material";
import { ChatMessage } from "../types";
import { openaiService } from "../services/openaiService";
import { mcpService } from "../services/mcpService";
import { MCP_SERVER_URL } from "../constants";

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
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
      <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <SmartIcon color="primary" />
          <Typography variant="h5" component="h1">
            AI Companies Chatbot
          </Typography>
          <Chip
            label={isConnected ? "Connected" : "Disconnected"}
            color={isConnected ? "success" : "error"}
            size="small"
          />
          {!openaiService.isConfigured() && (
            <Chip label="OpenAI Not Configured" color="warning" size="small" />
          )}
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Ask questions about AI companies, their chatbots, and LLM models
        </Typography>
      </Paper>

      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {/* Suggested Questions */}
      {messages.length === 0 && (
        <Paper elevation={1} sx={{ p: 2, mb: 2 }}>
          <Typography variant="subtitle2" gutterBottom>
            Try asking:
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {suggestedQuestions.map((question, index) => (
              <Chip
                key={index}
                label={question}
                variant="outlined"
                clickable
                onClick={() => handleSuggestedQuestion(question)}
                sx={{ mb: 1 }}
              />
            ))}
          </Stack>
        </Paper>
      )}

      {/* Messages */}
      <Paper
        elevation={1}
        sx={{
          flex: 1,
          p: 2,
          mb: 2,
          overflow: "auto",
          backgroundColor: "#fafafa",
        }}
      >
        {messages.length === 0 ? (
          <Box sx={{ textAlign: "center", py: 4 }}>
            <Typography variant="body1" color="text.secondary">
              Start a conversation by asking about AI companies!
            </Typography>
          </Box>
        ) : (
          messages.map((message) => (
            <Box
              key={message.id}
              sx={{
                mb: 2,
                display: "flex",
                justifyContent:
                  message.role === "user" ? "flex-end" : "flex-start",
              }}
            >
              <Paper
                elevation={2}
                sx={{
                  p: 2,
                  maxWidth: "70%",
                  backgroundColor:
                    message.role === "user" ? "primary.main" : "white",
                  color: message.role === "user" ? "white" : "text.primary",
                }}
              >
                <Typography variant="body1" sx={{ whiteSpace: "pre-wrap" }}>
                  {message.content}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    display: "block",
                    mt: 1,
                    opacity: 0.7,
                    textAlign: "right",
                  }}
                >
                  {message.timestamp.toLocaleTimeString()}
                </Typography>
              </Paper>
            </Box>
          ))
        )}
        {isLoading && (
          <Box sx={{ display: "flex", justifyContent: "flex-start", mb: 2 }}>
            <Paper
              elevation={2}
              sx={{ p: 2, display: "flex", alignItems: "center", gap: 1 }}
            >
              <CircularProgress size={16} />
              <Typography variant="body2">Thinking...</Typography>
            </Paper>
          </Box>
        )}
        <div ref={messagesEndRef} />
      </Paper>

      {/* Input */}
      <Paper elevation={2} sx={{ p: 2 }}>
        <Box sx={{ display: "flex", gap: 1 }}>
          <TextField
            fullWidth
            multiline
            maxRows={4}
            value={inputValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setInputValue(e.target.value)
            }
            onKeyDown={handleKeyDown}
            placeholder="Ask about AI companies, chatbots, or LLM models..."
            disabled={isLoading || !isConnected}
            variant="outlined"
          />
          <Button
            variant="contained"
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isLoading || !isConnected}
            sx={{ minWidth: "auto", px: 2 }}
          >
            <SendIcon />
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default ChatInterface;
