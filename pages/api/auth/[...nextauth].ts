import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: <string> process.env.GOOGLE_CLIENT_ID,
      clientSecret: <string> process.env.GOOGLE_CLIENT_SECRET,
    }),
    GithubProvider({
      clientId: <string> process.env.GITHUB_CLIENT_ID,
      clientSecret: <string> process.env.GITHUB_CLIENT_SECRET,
    })
  ],
  //   callbacks: {
  //   session({ session, token, user }) {
  //     return session // The return type will match the one returned in `useSession()`
  //   },
  // },
  secret: process.env.NEXTAUTH_URL
})
