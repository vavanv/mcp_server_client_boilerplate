import { SxProps, Theme } from "@mui/material";

export const useHeaderStyles = () => {
  const containerStyle: SxProps<Theme> = {
    p: 2,
    mb: 2,
  };

  const headerContentStyle: SxProps<Theme> = {
    display: "flex",
    alignItems: "center",
    gap: 1,
  };

  const subtitleStyle: SxProps<Theme> = {
    mt: 1,
  };

  return {
    containerStyle,
    headerContentStyle,
    subtitleStyle,
  };
};
