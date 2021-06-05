/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GuildQuery
// ====================================================

export interface GuildQuery_guild {
  __typename: "Guild";
  id: string;
  name: string;
  icon: string | null;
}

export interface GuildQuery {
  guild: GuildQuery_guild | null;
}

export interface GuildQueryVariables {
  id: string;
}
