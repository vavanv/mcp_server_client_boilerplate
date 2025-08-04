import { useRef, useEffect } from "react";
import { Box, Paper, Typography, CircularProgress } from "@mui/material";
import { ChatMessage } from "../types";
import { useMessageListStyles } from "./MessageListStyles";

interface MessageListProps {
  messages: ChatMessage[];
  isLoading: boolean;
}

const MessageList = ({ messages, isLoading }: MessageListProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const styles = useMessageListStyles();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <Paper elevation={1} sx={styles.containerStyle}>
      {messages.length === 0 ? (
        <Box sx={styles.emptyStateContainerStyle}>
          <Typography variant="body1" color="text.secondary">
            Start a conversation by asking about AI companies!
          </Typography>
        </Box>
      ) : (
        messages.map((message) => (
          <Box key={message.id} sx={styles.messageContainerStyle(message.role)}>
            <Paper elevation={2} sx={styles.messagePaperStyle(message.role)}>
              <Typography variant="body1" sx={styles.messageContentStyle}>
                {message.content}
              </Typography>
              <Typography variant="caption" sx={styles.timestampStyle}>
                {message.timestamp.toLocaleTimeString()}
              </Typography>
            </Paper>
          </Box>
        ))
      )}
      {isLoading && (
        <Box sx={styles.loadingContainerStyle}>
          <Paper elevation={2} sx={styles.loadingPaperStyle}>
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
