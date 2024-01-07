import { NextAuthOptions } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"

import prisma from "@/utils/prisma"
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
    jwt: async ({ token, user, trigger, session }) => {
      if (trigger === "update" && session.role) {
        token.team = session.team
        token.role = session.role
      }

      if (user) {
        const access = await prisma.member.findFirst({
          where: { user: { id: user.id } }
        })
        // check if the user already have a team.
        if (access) {
          token.team = { id: access.teamId }
          token.role = access.role
        }

        token.id = user.id
      }

      return Promise.resolve(token)
    },
    session: async ({ session, token }) => {
      session.user.id = token.id
      session.user.team = token.team
      session.user.role = token.role

      return Promise.resolve(session)
    }
  }
}

export default option
