/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { QuoteSearchInput } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: QuotesQuery
// ====================================================

export interface QuotesQuery_quotes_message_attachments {
  __typename: "QuoteMessageAttachment";
  id: string;
  url: string;
}

export interface QuotesQuery_quotes_message_author {
  __typename: "QuoteMessageAuthor";
  id: string;
  avatar: string | null;
  discriminator: string;
  username: string;
}

export interface QuotesQuery_quotes_message_channel {
  __typename: "QuoteMessageChannel";
  id: string;
}

export interface QuotesQuery_quotes_message_guild {
  __typename: "QuoteMessageGuild";
  id: string;
  name: string;
}

export interface QuotesQuery_quotes_message_member {
  __typename: "QuoteMessageMember";
  nickname: string | null;
}

export interface QuotesQuery_quotes_message {
  __typename: "QuoteMessage";
  id: string;
  attachments: (QuotesQuery_quotes_message_attachments | null)[] | null;
  author: QuotesQuery_quotes_message_author;
  channel: QuotesQuery_quotes_message_channel;
  content: string;
  createdAt: string;
  guild: QuotesQuery_quotes_message_guild;
  member: QuotesQuery_quotes_message_member;
}

export interface QuotesQuery_quotes {
  __typename: "Quote";
  id: number;
  guildId: string;
  userId: string;
  messageId: string | null;
  message: QuotesQuery_quotes_message;
}

export interface QuotesQuery {
  quotes: (QuotesQuery_quotes | null)[] | null;
}

export interface QuotesQueryVariables {
  searchInput?: QuoteSearchInput | null;
}
