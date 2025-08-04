import { Alert, AlertColor } from "@mui/material";

interface ErrorAlertProps {
  message: string | null;
  severity?: AlertColor;
  onClose: () => void;
  sx?: object;
}

const ErrorAlert = ({
  message,
  severity = "error",
  onClose,
  sx = { mb: 2 },
}: ErrorAlertProps) => {
  if (!message) return null;

  return (
    <Alert severity={severity} sx={sx} onClose={onClose}>
      {message}
    </Alert>
  );
};

export default ErrorAlert;
