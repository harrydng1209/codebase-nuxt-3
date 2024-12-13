/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_NODE_ENV: string;
  readonly VITE_PORT: string;
  readonly VITE_PORT_PREVIEW: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
  glob<T = unknown>(
    pattern: string,
    options?: {
      eager?: boolean;
      import?: string;
    }
  ): Record<string, T>;
}
