import { Box, TextField, Button, Paper } from "@mui/material";
import { Send as SendIcon } from "@mui/icons-material";
import { ChatInputProps } from "../types";

const ChatInput = ({
  value,
  onChange,
  onSend,
  disabled = false,
  loading = false,
  placeholder = "Ask about AI companies, their chatbots, or LLM models...",
  maxRows = 4,
}: ChatInputProps) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (value.trim() && !disabled && !loading) {
        onSend();
      }
    }
  };

  return (
    <Paper elevation={2} sx={{ p: 2 }}>
      <Box sx={{ display: "flex", gap: 1 }}>
        <TextField
          fullWidth
          multiline
          maxRows={maxRows}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          disabled={disabled || loading}
          variant="outlined"
          size="small"
        />
        <Button
          variant="contained"
          onClick={onSend}
          disabled={!value.trim() || disabled || loading}
          sx={{ minWidth: "auto", px: 2 }}
        >
          <SendIcon />
        </Button>
      </Box>
    </Paper>
  );
};

export default ChatInput;
