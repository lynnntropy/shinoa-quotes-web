import * as React from "react";
import { signIn, signOut, useSession } from "next-auth/client";

export interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = () => {
  const [session, loading] = useSession();
  console.log(session);

  return (
    <>
      {!session && (
        <>
          Not signed in <br />
          <button onClick={() => signIn("discord")}>Sign in</button>
        </>
      )}
      {session && (
        <>
          Signed in as {session.user?.email} <br />
          <button onClick={() => signOut()}>Sign out</button>
        </>
      )}
    </>
  );
};

export default HomePage;
