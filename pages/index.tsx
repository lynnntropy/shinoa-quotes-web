import * as React from "react";
import { signIn, useSession } from "next-auth/client";
import { gql, useQuery } from "@apollo/client";
import { GuildsQuery, GuildsQuery_guilds } from "./__generated__/GuildsQuery";
import { buildGuildIconUrl } from "../src/utils/discord";
import Link from "next/link";
import { guildPage } from "../src/utils/routes";

export interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = () => {
  const [session, sessionLoading] = useSession();

  const { data: guilds, loading } = useQuery<GuildsQuery>(gql`
    query GuildsQuery {
      guilds {
        id
        name
        icon
      }
    }
  `);

  React.useEffect(() => {
    if (!sessionLoading && !session) {
      signIn("discord");
    }
  }, [sessionLoading, session]);

  if (!session) {
    return null;
  }

  return (
    <>
      <div>
        <h2 className="mb-4 mt-0 text-xl font-semibold">Servers</h2>
        <div className="flex flex-col gap-4">
          {guilds?.guilds?.map((guild) => {
            if (!guild) {
              return null;
            }

            return (
              <Link href={guildPage(guild.id)}>
                <a>
                  <div className="flex items-center gap-4">
                    {guild.icon !== null && (
                      <img
                        src={buildGuildIconUrl(guild?.id, guild.icon)}
                        className="w-8 rounded-lg"
                      />
                    )}
                    <div className="text-lg font-medium">{guild?.name}</div>
                  </div>
                </a>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default HomePage;
