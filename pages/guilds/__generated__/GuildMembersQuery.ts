/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GuildMembersQuery
// ====================================================

export interface GuildMembersQuery_guild_members_user {
  __typename: "User";
  id: string;
  username: string;
  discriminator: string;
  avatar: string | null;
}

export interface GuildMembersQuery_guild_members {
  __typename: "GuildMember";
  user: GuildMembersQuery_guild_members_user | null;
  nick: string | null;
}

export interface GuildMembersQuery_guild {
  __typename: "Guild";
  members: (GuildMembersQuery_guild_members | null)[] | null;
}

export interface GuildMembersQuery {
  guild: GuildMembersQuery_guild | null;
}

export interface GuildMembersQueryVariables {
  query: string;
  limit?: number | null;
  id: string;
}
