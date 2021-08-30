import "minireset.css/minireset.css";
import "../styles/globals.css";
import "../styles/whitney.css";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import client from "../src/graphql/client";
import UserCircle from "../src/components/UserCircle";
import { Provider as AuthProvider } from "next-auth/client";
import Container from "../src/components/Container";
import { IconContext } from "react-icons/lib";
import SessionGate from "../src/components/SessionGate";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider session={pageProps.session}>
      <ApolloProvider client={client}>
        <IconContext.Provider value={{ style: { verticalAlign: "baseline" } }}>
          <SessionGate>
            <UserCircle />
            <Container>
              <Component {...pageProps} />
            </Container>
          </SessionGate>
        </IconContext.Provider>
      </ApolloProvider>
    </AuthProvider>
  );
}
export default MyApp;
