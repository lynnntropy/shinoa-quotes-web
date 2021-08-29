import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { debounce } from "lodash";
import { useRouter } from "next/dist/client/router";
import { useCallback, useEffect, useState } from "react";
import { buildGuildIconUrl } from "../../src/utils/discord";
import { GuildQuery, GuildQueryVariables } from "./__generated__/GuildQuery";
import { QuotesQuery, QuotesQueryVariables } from "./__generated__/QuotesQuery";

export interface GuildPageProps {}

const GUILD_QUERY = gql`
  query GuildQuery($id: String!) {
    guild(id: $id) {
      id
      name
      icon
    }
  }
`;

const GUILD_MEMBERS_QUERY = gql`
  query GuildMembersQuery($query: String!, $limit: Int, $id: String!) {
    guild(id: $id) {
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
`;

const QUOTES_QUERY = gql`
  query QuotesQuery($searchInput: QuoteSearchInput!) {
    quotes(searchInput: $searchInput) {
      id
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
        member {
          nickname
        }
      }
    }
  }
`;

const GuildPage: React.FC<GuildPageProps> = () => {
  const router = useRouter();
  const guildId = router.query.id as string;

  const [searchQuery, setSearchQuery] = useState<string>("");

  const { data: guildResult, loading: guildLoading } = useQuery<
    GuildQuery,
    GuildQueryVariables
  >(GUILD_QUERY, {
    variables: { id: guildId },
  });

  const [getQuotes, { data: quotesResult, loading: quotesLoading }] =
    useLazyQuery<QuotesQuery, QuotesQueryVariables>(QUOTES_QUERY);

  const search = useCallback(
    debounce((query: string) => {
      if (query.trim().length === 0) {
        return;
      }

      getQuotes({
        variables: { searchInput: { guildId, query } },
      });
    }, 500),
    []
  );

  useEffect(() => search(searchQuery), [searchQuery]);

  if (guildLoading) {
    return <>Loading...</>;
  }

  if (!guildResult || !guildResult.guild) {
    return <>Guild not found.</>;
  }

  const { guild } = guildResult;
  const { quotes } = quotesResult ?? { quotes: null };

  const SearchResults: React.FC = () => {
    if (searchQuery.trim().length === 0) {
      return (
        <div>Type something into the search field to search for quotes.</div>
      );
    }

    return (
      <div>
        {quotesLoading && <>Loading quotes...</>}
        {!quotesLoading &&
          quotes !== null &&
          quotes.map((q) => <>{q?.message.content}</>)}
        {!quotesLoading && (!quotes || quotes?.length === 0) && (
          <>No quotes found.</>
        )}
      </div>
    );
  };

  return (
    <>
      <div className="flex items-center gap-4 text-2xl">
        {guild.icon !== null && (
          <img
            src={buildGuildIconUrl(guild.id, guild.icon)}
            className="w-12 rounded-lg"
          />
        )}
        {guildResult?.guild?.name}
      </div>
      <hr className="my-4 border-gray-600" />
      <div className="my-4">
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Enter a query..."
          className="w-full h-8 px-3 bg-gray-600 rounded-md"
        />
      </div>
      <SearchResults />
    </>
  );
};

export default GuildPage;
