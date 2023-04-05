import { useCallback, useEffect, useState } from "react";
import contracts from "../../generated/hardhat_contracts";
import { Dimensions } from "../components/DimensionsInfo";
import { addProtocolIfMissing } from "../utils/url";
import { BigNumber } from "ethers";
import { useContract, useProvider } from "wagmi";

const adspaceContract = contracts[31337][0].contracts.AdspaceMarketplace;

export type Adspace = {
  owner: string;
  websiteUrl: string;
  dimensions: Dimensions;
  restrictions: string;
  bidIndex: BigNumber;
};

export const useAdspaces = () => {
  const provider = useProvider();
  const contract = useContract({
    address: adspaceContract.address,
    abi: adspaceContract.abi,
    signerOrProvider: provider,
  });
  const [adspaces, setAdspaces] = useState<Adspace[]>();

  const getAdspaces = useCallback(async () => {
    if (!contract) {
      return;
    }

    const adspaceIndex = await contract.adspaceIndex();

    if (!adspaceIndex) {
      return;
    }

    const result = await Promise.all(
      Array.from({ length: adspaceIndex.toNumber() }).map((_, index) =>
        contract.getAdspaceFromIndex(BigNumber.from(index)),
      ),
    );

    setAdspaces(
      result.map(adsp => {
        const dimensionsArray = adsp.dimensions.split(":").map(v => parseInt(v));
        return {
          ...adsp,
          websiteUrl: addProtocolIfMissing(adsp.websiteUrl),
          dimensions: { x: dimensionsArray[0], y: dimensionsArray[1] },
        };
      }),
    );
  }, [contract]);

  useEffect(() => {
    getAdspaces();
  }, [getAdspaces]);

  return { data: adspaces, loading: !adspaces, refetch: getAdspaces } as
    | { data: undefined; loading: true; refetch: () => void }
    | { data: Adspace[]; loading: false; refetch: () => void };
};
