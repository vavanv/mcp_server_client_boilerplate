import { SxProps, Theme } from "@mui/material";

export const useMessageListStyles = () => {
  const containerStyle: SxProps<Theme> = {
    flex: 1,
    p: 2,
    mb: 2,
    overflow: "auto",
    backgroundColor: "#fafafa",
  };

  const emptyStateContainerStyle: SxProps<Theme> = {
    textAlign: "center",
    py: 4,
  };

  const messageContainerStyle = (role: "user" | "assistant"): SxProps<Theme> => ({
    mb: 2,
    display: "flex",
    justifyContent: role === "user" ? "flex-end" : "flex-start",
  });

  const messagePaperStyle = (role: "user" | "assistant"): SxProps<Theme> => ({
    p: 2,
    maxWidth: "70%",
    backgroundColor: role === "user" ? "primary.main" : "white",
    color: role === "user" ? "white" : "text.primary",
  });

  const messageContentStyle: SxProps<Theme> = {
    whiteSpace: "pre-wrap",
  };

  const timestampStyle: SxProps<Theme> = {
    display: "block",
    mt: 1,
    opacity: 0.7,
    textAlign: "right",
  };

  const loadingContainerStyle: SxProps<Theme> = {
    display: "flex",
    justifyContent: "flex-start",
    mb: 2,
  };

  const loadingPaperStyle: SxProps<Theme> = {
    p: 2,
    display: "flex",
    alignItems: "center",
    gap: 1,
  };

  return {
    containerStyle,
    emptyStateContainerStyle,
    messageContainerStyle,
    messagePaperStyle,
    messageContentStyle,
    timestampStyle,
    loadingContainerStyle,
    loadingPaperStyle,
  };
};
