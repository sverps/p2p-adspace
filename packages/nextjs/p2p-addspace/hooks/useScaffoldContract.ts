import { useContract, useSigner } from "wagmi";
import { useDeployedContractInfo } from "~~/hooks/scaffold-eth";
import { ContractName } from "~~/utils/scaffold-eth/contract";

export const useScaffoldContract = <TContractName extends ContractName>(contractName: TContractName) => {
  // const provider = useProvider();
  const { data: signer } = useSigner();
  const { data: deployedContract, isLoading } = useDeployedContractInfo(contractName);

  const contract = useContract({
    address: deployedContract?.address,
    abi: deployedContract?.abi,
    signerOrProvider: signer,
  });

  return { contract, isLoading };
};
