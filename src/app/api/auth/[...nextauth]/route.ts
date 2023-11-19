import NextAuth from "next-auth"

import option from "@/app/api/auth/[...nextauth]/options"

const handler = NextAuth(option)

export { handler as GET, handler as POST }
