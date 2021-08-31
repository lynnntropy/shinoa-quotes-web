import * as React from "react";
import { gql, useQuery } from "@apollo/client";
import { GuildsQuery } from "./__generated__/GuildsQuery";
import { buildGuildIconUrl } from "../src/utils/discord";
import Link from "next/link";
import { guildPage } from "../src/utils/routes";
import { NextPage } from "next";

const HomePage: NextPage = () => {
  const { data: guilds, loading } = useQuery<GuildsQuery>(gql`
    query GuildsQuery {
      guilds {
        id
        name
        icon
      }
    }
  `);

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
