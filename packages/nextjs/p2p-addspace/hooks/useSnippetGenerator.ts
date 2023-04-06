import { useCallback } from "react";
import { generateSnippet } from "../utils/ad-display-snippet";
import { useScaffoldContract } from "./useScaffoldContract";
import { useProvider } from "wagmi";
import { getTargetNetwork } from "~~/utils/scaffold-eth";

export const useSnippetGenerator = ({ rpcUrl, adspaceIndex }: { rpcUrl?: string; adspaceIndex: number }) => {
  const { contract } = useScaffoldContract("AdspaceMarketplace");
  const provider = useProvider();

  return useCallback(async () => {
    const snippet = await generateSnippet({
      rpcUrl: rpcUrl ?? (provider as any).connection.url,
      contractAddress: contract?.address ?? "",
      chainId: getTargetNetwork().id,
      adspaceIndex,
    });
    navigator.clipboard.writeText(snippet);
  }, [adspaceIndex, contract?.address, provider, rpcUrl]);
};
