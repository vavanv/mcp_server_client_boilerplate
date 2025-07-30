export interface MuiButtonProps {
    color?: 'default' | 'inherit' | 'primary' | 'secondary';
    variant?: 'text' | 'outlined' | 'contained';
    onClick?: () => void;
    children: React.ReactNode;
}