export interface MuiButtonProps {
  color?: "default" | "inherit" | "primary" | "secondary";
  variant?: "text" | "outlined" | "contained";
  onClick?: () => void;
  children: React.ReactNode;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export interface MCPResponse {
  content: Array<{
    type: string;
    text: string;
  }>;
}

export interface Company {
  id: string;
  company: string;
  description: string;
  chats: Chat[];
  llms: LLM[];
}

export interface Chat {
  id: string;
  chatbot: string;
  companyId: string;
}

export interface LLM {
  id: string;
  llm: string;
  specialization: string;
  companyId: string;
}
