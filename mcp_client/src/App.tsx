import React from "react";
import { Box } from "@mui/material";
import ChatInterface from "./components/ChatInterface";

const App = () => {
  return (
    <Box sx={{ height: "100vh", overflow: "hidden" }}>
      <ChatInterface />
    </Box>
  );
};

export default App;
