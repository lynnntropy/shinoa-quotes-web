import "minireset.css/minireset.css";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import client from "../src/graphql/client";
import UserCircle from "../src/components/UserCircle";
import { Provider as AuthProvider } from "next-auth/client";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider session={pageProps.session}>
      <ApolloProvider client={client}>
        <UserCircle />
        <Component {...pageProps} />
      </ApolloProvider>
    </AuthProvider>
  );
}
export default MyApp;
