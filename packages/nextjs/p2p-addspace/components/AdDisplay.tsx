import { useMemo } from "react";
import { ethers } from "ethers";

type AdDisplayProps = {
  adIndex: number;
  rpcUrl: string;
  chainId: number;
};

export const AdDisplay = ({ adIndex, rpcUrl, chainId }: AdDisplayProps) => {
  const ipfsHash = useMemo(() => {
    const provider = new ethers.providers.JsonRpcProvider(rpcUrl, chainId);
    const adspaceContract = new ethers.Contract(
      "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9",
      [
        {
          inputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          name: "acceptedBids",
          outputs: [
            {
              internalType: "uint256",
              name: "adspaceIndex",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "bidIndex",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "adEndTimestamp",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          name: "adspaces",
          outputs: [
            {
              internalType: "address",
              name: "owner",
              type: "address",
            },
            {
              internalType: "string",
              name: "websiteUrl",
              type: "string",
            },
            {
              internalType: "string",
              name: "dimensions",
              type: "string",
            },
            {
              internalType: "string",
              name: "restrictions",
              type: "string",
            },
            {
              internalType: "uint256",
              name: "bidIndex",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
      ] as const,
      provider,
    );
  }, []);

  return <div>No ad running.</div>;
};
