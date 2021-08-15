import "minireset.css/minireset.css";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import client from "../src/graphql/client";
import UserCircle from "../src/components/UserCircle";
import { Provider as AuthProvider } from "next-auth/client";
import Container from "../src/components/Container";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider session={pageProps.session}>
      <ApolloProvider client={client}>
        <UserCircle />
        <Container>
          <Component {...pageProps} />
        </Container>
      </ApolloProvider>
    </AuthProvider>
  );
}
export default MyApp;
