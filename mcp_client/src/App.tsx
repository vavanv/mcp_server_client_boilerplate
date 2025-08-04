import React from "react";
import { Box } from "@mui/material";
import ChatInterface from "./components/ChatInterface";

const App: React.FC = () => {
  return (
    <Box sx={{ height: "100vh", overflow: "hidden" }}>
      <ChatInterface />
    </Box>
  );
};

export default App;
