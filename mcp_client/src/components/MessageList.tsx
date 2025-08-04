import { useRef, useEffect } from "react";
import { Box, Paper, Typography, CircularProgress } from "@mui/material";
import { ChatMessage } from "../types";

interface MessageListProps {
  messages: ChatMessage[];
  isLoading: boolean;
}

const MessageList = ({ messages, isLoading }: MessageListProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
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
  );
};

export default MessageList;
