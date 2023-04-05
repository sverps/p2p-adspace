import { useMemo } from "react";
import { BigNumber } from "ethers";
import { useContractReads } from "wagmi";
import contractsData from "~~/generated/hardhat_contracts";

export type Bid = {
  index: number;
  bidder: string;
  bid: BigNumber;
  ipfsAdCreative: string;
  adDestinationUrl: string;
};

export const useBids = (adspaceIndex: number, bidIndex: BigNumber) => {
  const { data: bids, refetch } = useContractReads({
    contracts: Array.from({ length: bidIndex.toNumber() }).map((_, index) => ({
      address: contractsData[31337][0].contracts.AdspaceMarketplace.address,
      abi: contractsData[31337][0].contracts.AdspaceMarketplace.abi,
      functionName: "bids",
      args: [BigNumber.from(adspaceIndex), BigNumber.from(index)],
    })),
  });

  return useMemo(
    () =>
      ({
        data: bids?.map<Bid>(({ bidder, bid, ipfsAdCreative, adDestinationUrl }: any, index) => ({
          index,
          adDestinationUrl,
          bid,
          bidder,
          ipfsAdCreative,
        })),
        loading: !bids,
        refetch,
      } as
        | { data: undefined; loading: true; refetch: () => void }
        | { data: Bid[]; loading: false; refetch: () => void }),
    [bids, refetch],
  );
};
