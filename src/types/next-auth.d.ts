import { Guild } from "../../pages/api/auth/[...nextauth].page";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      image: string;
      guildIds: string[];
    };
  }

  interface User {
    id: string;
    name: string;
    email: string;
    image: string;
    guilds: Guild[];
  }

  interface Profile {
    id: string;
    username: string;
    email: string;
    discriminator: string;
    avatar: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    guildIds: string[];
  }
}
