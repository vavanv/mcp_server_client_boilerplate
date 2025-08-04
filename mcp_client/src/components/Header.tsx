import { Box, Paper, Typography, Chip } from "@mui/material";
import { Psychology as SmartIcon } from "@mui/icons-material";
import { openaiService } from "../services/openaiService";

interface HeaderProps {
  isConnected: boolean;
}

const Header = ({ isConnected }: HeaderProps) => {
  return (
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
  );
};

export default Header;
