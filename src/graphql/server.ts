import { ApolloServer } from "apollo-server-micro";
import resolvers from "./resolvers";
// todo how do we do this properly?
// @ts-ignore
import typeDefs from "./schema.graphql";

const server = new ApolloServer({ typeDefs, resolvers });

export default server;
