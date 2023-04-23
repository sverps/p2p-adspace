import Head from "next/head";
import Link from "next/link";
import type { NextPage } from "next";
import { BugAntIcon, SparklesIcon } from "@heroicons/react/24/outline";
import { AdDisplay } from "~~/p2p-adspace/components/AdDisplay";
import { getTargetNetwork } from "~~/utils/scaffold-eth";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Scaffold-eth App</title>
        <meta name="description" content="Created with 🏗 scaffold-eth" />
      </Head>

      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center mb-8">
            <span className="block text-2xl mb-2">Welcome to</span>
            <span className="block text-4xl font-bold">Adspace marketplace</span>
            {getTargetNetwork().id === 31337 && (
              <AdDisplay adIndex={0} chainId={31337} rpcUrl="http://localhost:8545" />
            )}
          </h1>
          <p className="text-center text-lg">
            The adspace marketplace is deployed <a href="https://adspace-marketplace.vercel.app/marketplace">here</a>{" "}
            and connects to Sepolia.
          </p>
          <p>
            Code can be found on <a href="https://github.com/sverps/p2p-addspace">github</a>
          </p>
        </div>

        <div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12">
          <div className="flex justify-center items-center gap-12 flex-col sm:flex-row">
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <BugAntIcon className="h-8 w-8 fill-secondary" />
              <p>
                Tinker with your smart contract using the{" "}
                <Link href="/debug" passHref className="link">
                  Debug Contract
                </Link>{" "}
                tab.
              </p>
            </div>
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <SparklesIcon className="h-8 w-8 fill-secondary" />
              <p>
                Experiment with{" "}
                <Link href="/example-ui" passHref className="link">
                  Example UI
                </Link>{" "}
                to build your own UI.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
