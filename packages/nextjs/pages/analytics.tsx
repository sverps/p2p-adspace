import Head from "next/head";
import type { NextPage } from "next";
import { useQuery } from "wagmi";
import { Page } from "~~/p2p-adspace/components/Page";
import { useAuth } from "~~/p2p-adspace/hooks/auth";
import { Event } from "~~/p2p-adspace/utils/analytics";
import { getTargetNetwork } from "~~/utils/scaffold-eth";

const Analytics: NextPage = () => {
  const { token, onSignIn } = useAuth();
  const {
    data = [],
    // error,
    // isLoading,
  } = useQuery(
    ["GET_EVENTS"],
    async () => {
      const searchParams = new URLSearchParams();
      searchParams.set("chainId", getTargetNetwork().id.toString());
      const searchString = searchParams.toString();
      const response = await fetch(`/api/analytics${searchString ? `?${searchString}` : ""}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return (await response.json()) as Event[];
    },
    { enabled: !!token },
  );

  return (
    <Page>
      <Head>
        <title>Scaffold-eth App</title>
        <meta name="description" content="Created with 🏗 scaffold-eth" />
      </Head>

      <div className="flex items-center flex-col flex-grow pt-10">
        {!token ? (
          <button className="btn" onClick={onSignIn}>
            Sign in with address
          </button>
        ) : (
          <ul>
            {data?.map(event => (
              <li key={event.timestamp}>{event.timestamp}</li>
            ))}
          </ul>
        )}
      </div>
    </Page>
  );
};

export default Analytics;
