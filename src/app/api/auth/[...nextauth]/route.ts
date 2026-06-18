import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        // Demo user — in production this would check the database
        const validEmail = 'sarah.johnson@hireboard.io'
        const validPassword = 'hireboard123'

        if (credentials.email === validEmail && credentials.password === validPassword) {
          return {
            id: 'cmqfurskx000013z4ti100h4w',
            name: 'Sarah Johnson',
            email: 'sarah.johnson@hireboard.io',
            role: 'recruiter'
          }
        }

        return null
      }
    })
  ],
  pages: {
    signIn: '/login'
  },
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.role = user.role
      }
      return token
    },
    async session({ session, token }: any) {
      if (token) {
        session.user.role = token.role
      }
      return session
    }
  },
  secret: process.env.NEXTAUTH_SECRET
})

export { handler as GET, handler as POST }