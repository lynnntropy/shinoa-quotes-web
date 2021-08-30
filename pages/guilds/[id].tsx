import { gql, useLazyQuery, useQuery } from "@apollo/client";
import {
  DiscordAttachment,
  DiscordMessage,
  DiscordMessages,
} from "@skyra/discord-components-react";
import { debounce } from "lodash";
import { useRouter } from "next/dist/client/router";
import { useCallback, useEffect, useState } from "react";
import {
  buildAvatarUrl,
  buildGuildIconUrl,
  buildMessageLink,
} from "../../src/utils/discord";
import { GuildQuery, GuildQueryVariables } from "./__generated__/GuildQuery";
import {
  QuotesQuery,
  QuotesQueryVariables,
  QuotesQuery_quotes_message,
  QuotesQuery_quotes_message_attachments,
} from "./__generated__/QuotesQuery";
import * as mime from "mime-types";
import { HiExternalLink } from "react-icons/hi";
import Input from "../../src/components/forms/Input";
import RotateLoader from "react-spinners/RotateLoader";

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

const SearchResult: React.FC<{ message: QuotesQuery_quotes_message }> = ({
  message,
}) => {
  const router = useRouter();
  const guildId = router.query.id as string;

  const imageAttachments =
    message.attachments?.filter((a) =>
      (
        mime.lookup((a as QuotesQuery_quotes_message_attachments).url) ||
        "unknown"
      ).startsWith("image/")
    ) ?? [];

  const videoAttachments =
    message.attachments?.filter((a) =>
      (
        mime.lookup((a as QuotesQuery_quotes_message_attachments).url) ||
        "unknown"
      ).startsWith("video/")
    ) ?? [];

  return (
    <DiscordMessages className="border-none">
      <DiscordMessage
        author={message.member.nickname ?? message.author.username}
        avatar={
          message.author.avatar !== null
            ? buildAvatarUrl(message.author.id, message.author.avatar)
            : undefined
        }
        timestamp={new Date(message.createdAt)}
        twentyFour={false}
        className="bg-gray"
      >
        {message.content}
        {imageAttachments?.map((a) => (
          <DiscordAttachment url={a?.url} />
        ))}
        {videoAttachments?.length > 0 && (
          <div className="mt-2">
            {videoAttachments?.map((a) => (
              <video src={a?.url} controls />
            ))}
          </div>
        )}
        <div className="mt-2">
          <a
            href={buildMessageLink(guildId, message.channel.id, message.id)}
            className="block !text-gray-lightest !font-semibold"
          >
            <HiExternalLink
              className="inline relative mr-1"
              style={{ top: 3 }}
            />
            Jump to message in Discord
          </a>
        </div>
      </DiscordMessage>
    </DiscordMessages>
  );
};

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
    [guildId]
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
      <div className="flex flex-col gap-4">
        {quotesLoading && (
          <div className="py-10 flex justify-center transform scale-75">
            <RotateLoader color="#72767d" />
          </div>
        )}
        {!quotesLoading &&
          quotes !== null &&
          quotes.map((q) => (
            <SearchResult message={q?.message as QuotesQuery_quotes_message} />
          ))}
        {!quotesLoading && (!quotes || quotes?.length === 0) && (
          <>No quotes found.</>
        )}
      </div>
    );
  };

  return (
    <>
      <div className="flex items-center gap-4 text-2xl font-semibold">
        {guild.icon !== null && (
          <img
            src={buildGuildIconUrl(guild.id, guild.icon)}
            className="w-12 rounded-lg"
          />
        )}
        {guildResult?.guild?.name}
      </div>
      <hr className="my-4 border-gray-light" />
      <div className="my-4">
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Enter a query..."
          autoComplete="off"
        />
      </div>
      <SearchResults />
    </>
  );
};

export default GuildPage;
