import NextAuth from "next-auth";
import Providers from "next-auth/providers";

export default NextAuth({
  providers: [
    Providers.Discord({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session(session, token) {
      // expose user id
      return Promise.resolve({
        ...session,
        user: { ...session.user, id: token.sub },
      });
    },
  },
});
