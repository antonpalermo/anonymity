import { NextAuthOptions } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"

import prisma from "@/db/prisma"
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
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        const access = await prisma.member.findFirst({
          where: { user: { id: user.id } }
        })
        // check if the user already have a team.
        if (access) {
          token.tid = access.teamId
          token.role = access.role
        }

        token.id = user.id
      }

      return Promise.resolve(token)
    },
    session: async ({ session, token }) => {
      session.user.id = token.id
      session.user.tid = token.tid // team id
      session.user.role = token.role

      return Promise.resolve(session)
    }
  }
}

export default option
