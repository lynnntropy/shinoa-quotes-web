import { Guild } from "discord.js";
import gql from "graphql-tag";
import { IFieldResolver } from "graphql-tools";
import { IResolvers } from "graphql-tools";
import { Session } from "next-auth";
import shinoaClient from "./shinoaClient";

interface Context {
  session: Session;
}

interface AppResolvers extends IResolvers {
  Query: {
    // todo move this inside guild?
    quotes: IFieldResolver<
      any,
      Context,
      { searchInput: { guildId: string; query?: string; userId?: string } }
    >;
    guilds: IFieldResolver<any, Context>;
    guild: IFieldResolver<any, Context, { id: string }>;
  };
  Guild: {
    members: IFieldResolver<Guild, Context, { query: string; limit: number }>;
  };
}

const resolvers: AppResolvers = {
  Query: {
    quotes: async (_, args) => {
      const {
        data: { quotes },
      } = await shinoaClient.query({
        query: gql`
          query QuotesQuery($searchInput: QuoteSearchInput) {
            quotes(searchInput: $searchInput) {
              id
              guildId
              userId
              messageId
              message {
                id
                attachments {
                  id
                  url
                }
                author {
                  id
                  avatar
                  discriminator
                  username
                }
                channel {
                  id
                }
                content
                createdAt
                guild {
                  id
                  name
                }
                member {
                  nickname
                }
              }
            }
          }
        `,
        variables: { ...args },
      });

      return quotes;
    },

    guilds: async (_, __, { session }) => {
      const {
        data: { guilds },
      } = await shinoaClient.query({
        query: gql`
          query GuildsQuery {
            guilds {
              id
              name
              icon
            }
          }
        `,
      });

      return guilds.filter((g: any) => session.user.guildIds.includes(g.id));
    },

    guild: async (_, args, { session }) => {
      if (!session.user.guildIds.includes(args.id)) {
        return null;
      }

      const {
        data: { guild },
      } = await shinoaClient.query({
        query: gql`
          query GuildQuery($id: String!) {
            guild(id: $id) {
              id
              name
              icon
            }
          }
        `,
        variables: {
          ...args,
        },
      });

      return guild;
    },
  },

  Guild: {
    members: async (source, args) => {
      const { data } = await shinoaClient.query({
        query: gql`
          query MembersQuery(
            $guildId: String!
            $query: String!
            $limit: Int = 1
          ) {
            guild(id: $guildId) {
              members(query: $query, limit: $limit) {
                user {
                  id
                  username
                  discriminator
                  avatar
                }
                nick
              }
            }
          }
        `,
        variables: {
          guildId: source.id,
          ...args,
        },
      });

      return data.guild?.members;
    },
  },
};

export default resolvers;
