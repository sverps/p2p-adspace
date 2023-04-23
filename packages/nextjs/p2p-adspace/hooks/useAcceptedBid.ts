import { useMemo, useState } from "react";
import { Bid } from "./useBids";
import { BigNumber } from "ethers";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";

type AcceptedBid = {
  adspaceIndex: BigNumber;
  bidIndex: BigNumber;
  adEndTimestamp: BigNumber;
};

export type EnrichedAcceptedBid = AcceptedBid & {
  index: number;
  bidder: string;
  bid: BigNumber;
  ipfsAdCreative: string;
  adDestinationUrl: string;
};

export const useAcceptedBid = (adspaceIndex: number, bids?: Bid[]) => {
  const [currentTime, setCurrentTime] = useState(new Date().getTime());
  const {
    data: acceptedBidFromContract,
    isLoading,
    refetch,
  } = useScaffoldContractRead({
    contractName: "AdspaceMarketplace",
    functionName: "acceptedBids",
    args: [BigNumber.from(adspaceIndex)],
  }) as { data?: AcceptedBid } & Omit<ReturnType<typeof useScaffoldContractRead>, "data">;

  const acceptedBid = useMemo(() => {
    const acceptedBid = bids?.find(bid => bid.index === acceptedBidFromContract?.bidIndex.toNumber());
    if (
      !acceptedBid ||
      !acceptedBidFromContract ||
      acceptedBidFromContract.adEndTimestamp.toNumber() * 1000 <= currentTime
    ) {
      return undefined;
    }
    return { ...acceptedBid, ...acceptedBidFromContract };
  }, [acceptedBidFromContract, bids, currentTime]);

  return useMemo(
    () =>
      ({
        data: acceptedBid,
        loading: isLoading,
        refetch: () => {
          setCurrentTime(new Date().getTime());
          refetch();
        },
      } as
        | { data: undefined; loading: true; refetch: () => void }
        | { data: EnrichedAcceptedBid; loading: false; refetch: () => void }),
    [acceptedBid, isLoading, refetch],
  );
};
