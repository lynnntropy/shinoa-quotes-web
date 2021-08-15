/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: guilds
// ====================================================

export interface guilds_guilds {
  __typename: "Guild";
  id: string;
  name: string;
  icon: string | null;
}

export interface guilds {
  guilds: (guilds_guilds | null)[] | null;
}
