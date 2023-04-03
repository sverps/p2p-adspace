import { useCallback, useEffect, useState } from "react";
import { useScaffoldContract } from "./useScaffoldContract";
import { BigNumber } from "ethers";

export type Bid = {
  index: number;
  bidder: string;
  bid: BigNumber;
  ipfsAdCreative: string;
  adDestinationUrl: string;
};

export const useBids = (adspaceIndex: number, bidIndex: BigNumber) => {
  const { contract } = useScaffoldContract("AdspaceMarketplace");
  const [bids, setBids] = useState<Bid[]>();

  const getBids = useCallback(async () => {
    if (!contract) {
      return;
    }

    const result = await Promise.all(
      Array.from({ length: bidIndex.toNumber() }).map((_, index) =>
        contract.bids(BigNumber.from(adspaceIndex), BigNumber.from(index)),
      ),
    );

    setBids(
      result.map(({ bidder, bid, ipfsAdCreative, adDestinationUrl }, index) => ({
        index,
        bidder,
        bid,
        ipfsAdCreative,
        adDestinationUrl,
      })),
    );
  }, [adspaceIndex, bidIndex, contract]);

  useEffect(() => {
    getBids();
  }, [getBids]);

  return { data: bids, loading: !bids, refetch: getBids } as
    | { data: undefined; loading: true; refetch: () => void }
    | { data: Bid[]; loading: false; refetch: () => void };
};
