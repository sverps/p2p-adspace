import Head from "next/head";
import { CategoryScale, Chart, Filler, Legend, LineElement, LinearScale, PointElement, Title, Tooltip } from "chart.js";
import type { NextPage } from "next";
import { Line } from "react-chartjs-2";
import { useQuery } from "wagmi";
import { useDeployedContractInfo } from "~~/hooks/scaffold-eth";
import { Page } from "~~/p2p-adspace/components/Page";
import { Pane } from "~~/p2p-adspace/components/Pane";
import { useAuth } from "~~/p2p-adspace/hooks/auth";
import { Event } from "~~/p2p-adspace/utils/analytics";
import { getTargetNetwork } from "~~/utils/scaffold-eth";

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Title, Tooltip, Legend);

const Analytics: NextPage = () => {
  const { token, onSignIn } = useAuth();
  const { data: deployedContract } = useDeployedContractInfo("AdspaceMarketplace");
  const {
    data = [],
    // error,
    // isLoading,
  } = useQuery(
    ["GET_EVENTS"],
    async () => {
      const searchParams = new URLSearchParams();
      searchParams.set("chainId", getTargetNetwork().id.toString());
      searchParams.set("contractAddress", deployedContract!.address);
      const searchString = searchParams.toString();
      const response = await fetch(`/api/analytics${searchString ? `?${searchString}` : ""}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return (await response.json()) as Event[];
    },
    { enabled: !!token && !!deployedContract },
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
      <Pane className="w-full">
        <Line
          options={{
            responsive: true,
            // plugins: {
            //   title: {
            //     display: true,
            //     text: "Chart.js Line Chart - Cubic interpolation mode",
            //   },
            // },
            interaction: {
              intersect: false,
            },
            scales: {
              x: {
                display: true,
                title: {
                  display: true,
                },
              },
              y: {
                display: true,
                // title: {
                //   display: true,
                //   text: "Value",
                // },
                // suggestedMin: -10,
                // suggestedMax: 200,
              },
            },
          }}
          data={{
            labels: [0, 20, 20, 60, 60, 120, NaN, 180, 120, 125, 105, 110, 170].map((_, index) => index.toString()),
            datasets: [
              {
                label: "Impressions",
                data: [0, 20, 20, 60, 60, 120, 150, 180, 120, 125, 105, 110, 170],
                borderColor: "#f00",
                fill: { target: { value: -Infinity }, above: "#f004" },
                cubicInterpolationMode: "monotone",
                tension: 0.4,
              },
              {
                label: "Unique",
                data: [0, 20, 20, 60, 60, 120, 150, 180, 120, 125, 105, 110, 170],
                borderColor: "#f00",
                fill: { target: { value: -Infinity }, above: "#f004" },
                cubicInterpolationMode: "monotone",
                tension: 0.4,
              },
              // {
              //   label: "Cubic interpolation",
              //   data: [0, 20, 20, 60, 60, 120, NaN, 180, 120, 125, 105, 110, 170],
              //   borderColor: "#00f",
              //   fill: false,
              //   tension: 0.4,
              // },
              // {
              //   label: "Linear interpolation (default)",
              //   data: [0, 20, 20, 60, 60, 120, NaN, 180, 120, 125, 105, 110, 170],
              //   borderColor: "#0f0",
              //   fill: false,
              // },
            ],
          }}
          // {...props}
        />
      </Pane>
    </Page>
  );
};

export default Analytics;
