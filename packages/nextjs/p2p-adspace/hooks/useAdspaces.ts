import { useCallback, useEffect, useState } from "react";
import { Dimensions } from "../components/DimensionsInfo";
import { addProtocolIfMissing } from "../utils/url";
import { BigNumber } from "ethers";
import { useContract, useProvider } from "wagmi";
import contractsData from "~~/generated/hardhat_contracts";
import { getTargetNetwork } from "~~/utils/scaffold-eth";

const adspaceContract = contractsData[getTargetNetwork().id as unknown as "31337"][0].contracts.AdspaceMarketplace;

export type Adspace = {
  index: number;
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
      result.map((adsp, index) => {
        const dimensionsArray = adsp.dimensions.split(":").map(v => parseInt(v));
        return {
          ...adsp,
          index,
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
