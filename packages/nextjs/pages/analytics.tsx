import Head from "next/head";
import type { NextPage } from "next";
import { useQuery } from "wagmi";
import { Event } from "~~/p2p-adspace/utils/analytics";

const Analytics: NextPage = () => {
  const {
    data = [],
    error,
    isLoading,
  } = useQuery(["GET_EVENTS"], async () => {
    const response = await fetch("/api/analytics/31337-0-0");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return (await response.json()) as Event[];
  });

  return (
    <>
      <Head>
        <title>Scaffold-eth App</title>
        <meta name="description" content="Created with 🏗 scaffold-eth" />
      </Head>

      <div className="flex items-center flex-col flex-grow pt-10">
        <ul>
          {data?.map(event => (
            <li key={event.timestamp}>{event.timestamp}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Analytics;
