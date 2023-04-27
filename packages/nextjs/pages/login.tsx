import Head from "next/head";
import type { NextPage } from "next";
import { useAuth } from "~~/p2p-adspace/hooks/useAuth";

const Login: NextPage = () => {
  useAuth();
  return (
    <>
      <Head>
        <title>Scaffold-eth App</title>
        <meta name="description" content="Created with 🏗 scaffold-eth" />
      </Head>

      <div className="flex items-center flex-col flex-grow pt-10">TEST LOGIN</div>
    </>
  );
};

export default Login;
