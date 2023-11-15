declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production"
      DATABASE_URL: string
      NEXTAUTH_URL: string
      NEXTAUTH_SECRET: string
      NEXTAUTH_GOOGLE_CLIENT_ID: string
      NEXTAUTH_GOOGLE_CLIENT_SECRET: string
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}
