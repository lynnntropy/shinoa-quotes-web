import { ApolloServer, AuthenticationError } from "apollo-server-micro";
import { getSession } from "next-auth/client";
import resolvers from "./resolvers";
// todo how do we do this properly?
// @ts-ignore
import typeDefs from "./schema.graphql";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const session = await getSession({ req });
    if (session === null) {
      throw new AuthenticationError(
        "You must be logged in to access the GraphQL API."
      );
    }

    return { session };
  },
});

export default server;
