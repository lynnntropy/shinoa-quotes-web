import * as React from "react";
import { signIn, signOut, useSession } from "next-auth/client";
import { gql, useQuery } from "@apollo/client";
import { GuildsQuery } from "./__generated__/GuildsQuery";

export interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = () => {
  const [session, sessionLoading] = useSession();

  const { data: guilds, loading } = useQuery<GuildsQuery>(gql`
    query GuildsQuery {
      guilds {
        id
        name
        icon
      }
    }
  `);

  React.useEffect(() => {
    if (!sessionLoading && !session) {
      signIn("discord");
    }
  }, []);

  if (!session) {
    return null;
  }

  return (
    <>
      Signed in as {session.user?.email} <br />
      <button onClick={() => signOut()}>Sign out</button>
      <div>
        <span>Servers:</span>
        {guilds?.guilds?.map((g) => (
          <div>{g?.name}</div>
        ))}
      </div>
    </>
  );
};

export default HomePage;
