/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GuildsQuery
// ====================================================

export interface GuildsQuery_guilds {
  __typename: "Guild";
  id: string;
  name: string;
  icon: string | null;
}

export interface GuildsQuery {
  guilds: (GuildsQuery_guilds | null)[] | null;
}
