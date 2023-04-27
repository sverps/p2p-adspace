import Head from "next/head";
import type { NextPage } from "next";
import { useQuery } from "wagmi";
import { Event } from "~~/p2p-adspace/utils/analytics";
import { getTargetNetwork } from "~~/utils/scaffold-eth";

const Analytics: NextPage = () => {
  const {
    data = [],
    error,
    isLoading,
  } = useQuery(["GET_EVENTS"], async () => {
    const searchParams = new URLSearchParams();
    searchParams.set("chainId", getTargetNetwork().id.toString());
    const searchString = searchParams.toString();
    const response = await fetch(`/api/analytics${searchString ? `?${searchString}` : ""}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return (await response.json()) as Event[];
  });

  console.log({ data });
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
