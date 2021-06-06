import { ApolloClient, InMemoryCache } from "@apollo/client";

const shinoaClient = new ApolloClient({
  uri: "http://host.docker.internal:8080", // todo
  cache: new InMemoryCache(),
});

export default shinoaClient;
