import axios from "axios";
import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";
import Providers from "next-auth/providers";

export interface Guild {
  id: string;
  name: string;
  icon: string;
  owner: boolean;
  permissions: string;
  features: string[];
}

type GuildsResponse = Guild[];

export default NextAuth({
  providers: [
    Providers.Discord({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      scope: "identify email guilds",
      async profile(profile, tokens) {
        let imageUrl: string;

        if (profile.avatar === null) {
          const defaultAvatarNumber = parseInt(profile.discriminator) % 5;
          imageUrl = `https://cdn.discordapp.com/embed/avatars/${defaultAvatarNumber}.png`;
        } else {
          const format = profile.avatar.startsWith("a_") ? "gif" : "png";
          imageUrl = `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.${format}`;
        }

        const { data: guilds } = await axios.get<GuildsResponse>(
          "https://discord.com/api/users/@me/guilds",
          {
            headers: {
              Authorization: `Bearer ${tokens.accessToken}`,
            },
          }
        );

        return {
          id: profile.id,
          name: profile.username,
          image: imageUrl,
          email: profile.email,
          guilds,
        };
      },
    }),
  ],
  callbacks: {
    async session(session, token) {
      return Promise.resolve({
        ...session,
        user: {
          ...session.user,
          id: token.sub as string,
          guildIds: (token as JWT).guildIds,
        },
      });
    },

    async jwt(token, user) {
      if (user?.guilds) {
        token.guildIds = user.guilds.map((g: Guild) => g.id);
      }

      return token;
    },
  },
});
