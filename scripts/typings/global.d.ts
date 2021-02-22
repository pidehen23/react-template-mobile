declare module 'error-overlay-webpack-plugin';

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production';
    readonly PUBLIC_URL: string;
  }
}
