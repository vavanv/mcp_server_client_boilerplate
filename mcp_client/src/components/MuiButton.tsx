import React from "react";
import Button, { ButtonProps } from "@mui/material/Button";

interface MuiButtonProps {
  color?: ButtonProps["color"];
  variant?: ButtonProps["variant"];
  onClick?: () => void;
  children: React.ReactNode;
}

const MuiButton: React.FC<MuiButtonProps> = ({
  color = "primary",
  variant = "contained",
  onClick,
  children,
}) => {
  return (
    <Button color={color} variant={variant} onClick={onClick}>
      {children}
    </Button>
  );
};

export default MuiButton;
