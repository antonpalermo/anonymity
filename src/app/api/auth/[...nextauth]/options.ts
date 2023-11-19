import { NextAuthOptions } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"

import prisma from "../../../../db/prisma"
import GoogleProvider from "next-auth/providers/google"

/**
 * https://next-auth.js.org/configuration/options
 */
const option: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.NEXTAUTH_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NEXTAUTH_GOOGLE_CLIENT_SECRET
    })
  ],
  session: {
    // override session strategy
    strategy: "jwt"
  }
}

export default option
