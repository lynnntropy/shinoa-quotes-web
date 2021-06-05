import { Guild } from "discord.js";
import gql from "graphql-tag";
import { IFieldResolver } from "graphql-tools";
import { IResolvers } from "graphql-tools";
import client from "./client";
import { GuildQuery, GuildQueryVariables } from "./__generated__/GuildQuery";
import { GuildsQuery } from "./__generated__/GuildsQuery";
import {
  MembersQuery,
  MembersQueryVariables,
} from "./__generated__/MembersQuery";
import { QuotesQuery, QuotesQueryVariables } from "./__generated__/QuotesQuery";

interface AppResolvers extends IResolvers {
  Query: {
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
      } = await client.query<QuotesQuery, QuotesQueryVariables>({
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
      } = await client.query<GuildsQuery>({
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

      return guilds;
    },

    guild: async (_, args) => {
      const {
        data: { guild },
      } = await client.query<GuildQuery, GuildQueryVariables>({
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
      const { data } = await client.query<MembersQuery, MembersQueryVariables>({
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
