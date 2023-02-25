import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google";


export default NextAuth({
  // secret: process.env.NEXTAUTH_URL,
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
  //   callbacks: {
  //   session({ session, token, user }) {
  //     return session // The return type will match the one returned in `useSession()`
  //   },
  // },

})
