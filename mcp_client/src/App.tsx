import React from 'react';
import { Container, Typography } from '@mui/material';
import MuiButton from './components/MuiButton';

const App: React.FC = () => {
    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Welcome to My First MCP Client
            </Typography>
            <MuiButton color="primary" variant="contained" onClick={() => alert('Button Clicked!')}>
                Click Me
            </MuiButton>
        </Container>
    );
};

export default App;