import { useContract, useProvider } from "wagmi";
import { useDeployedContractInfo } from "~~/hooks/scaffold-eth";
import { ContractName } from "~~/utils/scaffold-eth/contract";

export const useScaffoldContract = <TContractName extends ContractName>(contractName: TContractName) => {
  const provider = useProvider();
  const { data: deployedContract, isLoading } = useDeployedContractInfo(contractName);

  const contract = useContract({
    address: deployedContract?.address,
    abi: deployedContract?.abi,
    signerOrProvider: provider,
  });

  return { contract, isLoading };
};
