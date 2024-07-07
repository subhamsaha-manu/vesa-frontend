export type AppConfig = {
  ENABLE_PATH: boolean
}

declare global {
  interface Window {
    AppConfig: AppConfig
  }
}
