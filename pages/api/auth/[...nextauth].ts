import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: <string> process.env.GOOGLE_ID,
      clientSecret: <string> process.env.GOOGLE_SECRET,
    }),
    GithubProvider({
      clientId: <string> process.env.GITHUB_ID,
      clientSecret: <string> process.env.GITHUB_SECRET,
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
})
