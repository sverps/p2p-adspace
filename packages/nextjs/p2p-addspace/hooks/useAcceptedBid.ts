import { useMemo } from "react";
import { BigNumber } from "ethers";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";

export type AcceptedBid = {
  adspaceIndex: BigNumber;
  bidIndex: BigNumber;
  adEndTimestamp: BigNumber;
};

export const useAcceptedBid = (adspaceIndex: number) => {
  const {
    data: acceptedBid,
    isLoading,
    refetch,
  } = useScaffoldContractRead({
    contractName: "AdspaceMarketplace",
    functionName: "acceptedBids",
    args: [BigNumber.from(adspaceIndex)],
  }) as { data?: AcceptedBid } & Omit<ReturnType<typeof useScaffoldContractRead>, "data">;

  console.log({ acceptedBid });

  return useMemo(
    () =>
      ({
        data: acceptedBid?.adEndTimestamp.toNumber() === 0 ? undefined : acceptedBid,
        loading: isLoading,
        refetch,
      } as
        | { data: undefined; loading: true; refetch: () => void }
        | { data: AcceptedBid; loading: false; refetch: () => void }),
    [acceptedBid, isLoading, refetch],
  );
};
