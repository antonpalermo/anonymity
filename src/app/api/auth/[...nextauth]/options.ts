import { NextAuthOptions } from "next-auth"

import GoogleProvider from "next-auth/providers/google"

/**
 * https://next-auth.js.org/configuration/options
 */
const option: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.NEXTAUTH_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NEXTAUTH_GOOGLE_CLIENT_SECRET
    })
  ]
}

export default option
