// Application Constants

// Server Configuration
export const DEFAULT_SERVER_HOST = "localhost";
export const DEFAULT_SERVER_PORT = 3100;
export const DEFAULT_MCP_ENDPOINT = "/mcp";
export const DEFAULT_HEALTH_ENDPOINT = "/health";

// Constructed URLs
export const DEFAULT_MCP_SERVER_URL = `http://${DEFAULT_SERVER_HOST}:${DEFAULT_SERVER_PORT}${DEFAULT_MCP_ENDPOINT}`;
export const DEFAULT_HEALTH_URL = `http://${DEFAULT_SERVER_HOST}:${DEFAULT_SERVER_PORT}${DEFAULT_HEALTH_ENDPOINT}`;

// API Endpoints (for Vite proxy)
export const API_ENDPOINTS = {
  MCP: "/api/mcp",
  HEALTH: "/api/health",
} as const;

// Environment Variables
export const ENV = {
  MCP_SERVER_URL: import.meta.env.VITE_MCP_SERVER_URL,
  OPENAI_API_KEY: import.meta.env.VITE_OPENAI_API_KEY,
  PROXY_TARGET: import.meta.env.VITE_PROXY_TARGET,
} as const;

// Derived Constants
export const MCP_SERVER_URL = ENV.MCP_SERVER_URL || DEFAULT_MCP_SERVER_URL;

// OpenAI Configuration
export const OPENAI_CONFIG = {
  MODEL: "gpt-3.5-turbo",
  MAX_TOKENS: 1000,
  TEMPERATURE: 0.7,
} as const;
