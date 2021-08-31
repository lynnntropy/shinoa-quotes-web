import { ApolloClient, InMemoryCache } from "@apollo/client";

const shinoaClient = new ApolloClient({
  uri: process.env.SHINOA_API_URL,
  cache: new InMemoryCache(),
});

export default shinoaClient;
