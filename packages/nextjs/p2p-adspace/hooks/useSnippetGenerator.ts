import { useCallback, useState } from "react";
import { generateSnippet } from "../utils/ad-display-snippet";
import { useProvider } from "wagmi";
import { useDeployedContractInfo } from "~~/hooks/scaffold-eth";
import { getTargetNetwork } from "~~/utils/scaffold-eth";

export const useSnippetGenerator = ({ rpcUrl, adspaceIndex }: { rpcUrl?: string; adspaceIndex: number }) => {
  const contract = useDeployedContractInfo("AdspaceMarketplace");
  const provider = useProvider();
  const [justCopied, setJustCopied] = useState(false);

  return {
    copySnippet: useCallback(async () => {
      const snippet = await generateSnippet({
        rpcUrl: rpcUrl ?? (provider as any).connection.url,
        contractAddress: contract.data?.address ?? "",
        chainId: getTargetNetwork().id,
        adspaceIndex,
      });
      navigator.clipboard.writeText(snippet);
      setJustCopied(true);
      setTimeout(() => {
        setJustCopied(false);
      }, 800);
    }, [adspaceIndex, contract.data?.address, provider, rpcUrl]),
    justCopied,
  };
};
