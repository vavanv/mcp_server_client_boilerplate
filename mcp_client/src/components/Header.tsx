import { Box, Paper, Typography, Chip } from "@mui/material";
import { Psychology as SmartIcon } from "@mui/icons-material";
import { openaiService } from "../services/openaiService";
import { useHeaderStyles } from "./HeaderStyles";

interface HeaderProps {
  isConnected: boolean;
}

const Header = ({ isConnected }: HeaderProps) => {
  const styles = useHeaderStyles();

  return (
    <Paper elevation={2} sx={styles.containerStyle}>
      <Box sx={styles.headerContentStyle}>
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
      <Typography
        variant="body2"
        color="text.secondary"
        sx={styles.subtitleStyle}
      >
        Ask questions about AI companies, their chatbots, and LLM models
      </Typography>
    </Paper>
  );
};

export default Header;
