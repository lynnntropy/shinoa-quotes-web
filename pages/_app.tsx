import "minireset.css/minireset.css";
import "../styles/globals.css";
import "../styles/whitney.css";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import client from "../src/graphql/client";
import UserCircle from "../src/components/UserCircle";
import { Provider as AuthProvider, signIn, useSession } from "next-auth/client";
import Container from "../src/components/Container";
import { IconContext } from "react-icons/lib";
import React from "react";

function MyApp({ Component, pageProps }: AppProps) {
  const [session, sessionLoading] = useSession();

  React.useEffect(() => {
    if (!sessionLoading && !session) {
      signIn("discord");
    }
  }, [sessionLoading, session]);

  if (!session) {
    return null;
  }

  return (
    <AuthProvider session={pageProps.session}>
      <ApolloProvider client={client}>
        <IconContext.Provider value={{ style: { verticalAlign: "baseline" } }}>
          <UserCircle />
          <Container>
            <Component {...pageProps} />
          </Container>
        </IconContext.Provider>
      </ApolloProvider>
    </AuthProvider>
  );
}
export default MyApp;
