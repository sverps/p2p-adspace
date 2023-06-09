import { useMemo } from "react";
import { addProtocolIfMissing } from "../utils/url";
import { BigNumber } from "ethers";
import { useContractReads } from "wagmi";
import contractsData from "~~/generated/hardhat_contracts";
import { getTargetNetwork } from "~~/utils/scaffold-eth";

const adspaceContract = contractsData[getTargetNetwork().id as unknown as "31337"][0].contracts.AdspaceMarketplace;

export type Bid = {
  index: number;
  bidder: string;
  bid: BigNumber;
  ipfsAdCreative: string;
  adDestinationUrl: string;
  adDuration: BigNumber;
};

export const useBids = (adspaceIndex: number, bidIndex: BigNumber) => {
  const { data: bids, refetch } = useContractReads({
    contracts: Array.from({ length: bidIndex.toNumber() }).map((_, index) => ({
      address: adspaceContract.address,
      abi: adspaceContract.abi,
      functionName: "bids",
      args: [BigNumber.from(adspaceIndex), BigNumber.from(index)],
    })),
  });

  return useMemo(
    () =>
      ({
        data: bids?.map<Bid>(({ bidder, bid, ipfsAdCreative, adDestinationUrl, adDuration }: any, index) => ({
          index,
          adDestinationUrl: addProtocolIfMissing(adDestinationUrl),
          adDuration,
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
