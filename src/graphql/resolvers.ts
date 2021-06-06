import { Guild } from "discord.js";
import gql from "graphql-tag";
import { IFieldResolver } from "graphql-tools";
import { IResolvers } from "graphql-tools";
import shinoaClient from "./shinoaClient";

interface AppResolvers extends IResolvers {
  Query: {
    // todo move this inside guild?
    quotes: IFieldResolver<
      any,
      any,
      { searchInput: { guildId: string; query?: string; userId?: string } }
    >;
    guilds: IFieldResolver<any, any>;
    guild: IFieldResolver<any, any, { id: string }>;
  };
  Guild: {
    members: IFieldResolver<Guild, any, { query: string; limit: number }>;
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

    guilds: async () => {
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

      // todo filter guilds

      return guilds;
    },

    guild: async (_, args) => {
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

      // todo authorize guild

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
