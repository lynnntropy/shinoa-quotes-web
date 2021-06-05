/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: MembersQuery
// ====================================================

export interface MembersQuery_guild_members_user {
  __typename: "User";
  id: string;
  username: string;
  discriminator: string;
  avatar: string | null;
}

export interface MembersQuery_guild_members {
  __typename: "GuildMember";
  user: MembersQuery_guild_members_user | null;
  nick: string | null;
}

export interface MembersQuery_guild {
  __typename: "Guild";
  members: (MembersQuery_guild_members | null)[] | null;
}

export interface MembersQuery {
  guild: MembersQuery_guild | null;
}

export interface MembersQueryVariables {
  guildId: string;
  query: string;
  limit?: number | null;
}
