import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://host.docker.internal:8080", // todo
  cache: new InMemoryCache(),
});

export default client;
