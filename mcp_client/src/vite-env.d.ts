/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_OPENAI_API_KEY: string;
  readonly VITE_MCP_SERVER_URL: string;
  readonly VITE_PROXY_TARGET: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
