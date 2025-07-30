import React from 'react';
import Button from '@mui/material/Button';

interface MuiButtonProps {
  color?: 'default' | 'inherit' | 'primary' | 'secondary';
  variant?: 'text' | 'outlined' | 'contained';
  onClick?: () => void;
  children: React.ReactNode;
}

const MuiButton: React.FC<MuiButtonProps> = ({ color = 'primary', variant = 'contained', onClick, children }) => {
  return (
    <Button color={color} variant={variant} onClick={onClick}>
      {children}
    </Button>
  );
};

export default MuiButton;