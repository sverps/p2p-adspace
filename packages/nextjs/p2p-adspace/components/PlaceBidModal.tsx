import { useCallback, useEffect, useState } from "react";
import { Actions } from "./Actions";
import { Dialog } from "@headlessui/react";
import { BigNumber, utils } from "ethers";
import { EtherInput, InputBase, IntegerInput } from "~~/components/scaffold-eth";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

type PlaceBidModalProps = { adspaceIndex?: number; onClose: (refetch?: boolean) => void };

export const PlaceBidModal = ({ adspaceIndex, onClose }: PlaceBidModalProps) => {
  const [ipfsAdCreative, setIpfsAdCreative] = useState<string>(); // e.g. Qmd286K6pohQcTKYqnS1YhWrCiS4gz7Xi34sdwMe9USZ7u
  const [adDestination, setAdDestination] = useState<string>();
  const [adDuration, setAdDuration] = useState<BigNumber | string>();

  const [value, setValue] = useState<string>();

  const { writeAsync, isSuccess } = useScaffoldContractWrite({
    contractName: "AdspaceMarketplace",
    functionName: "bid",
    args: [
      BigNumber.from(adspaceIndex ?? 0),
      value ? utils.parseEther(value) : undefined,
      ipfsAdCreative,
      adDestination,
      BigNumber.from(adDuration ?? 0),
    ],
    value,
  });

  const handleClose = useCallback(
    (refetch?: boolean) => {
      setIpfsAdCreative(undefined);
      setAdDestination(undefined);
      setValue(undefined);
      onClose(refetch);
    },
    [onClose],
  );

  useEffect(() => {
    if (isSuccess) {
      handleClose(true);
    }
  }, [isSuccess, handleClose]);

  return (
    <Dialog open={typeof adspaceIndex === "number"} onClose={handleClose} className="">
      <div className="absolute z-20 w-full h-full top-0 left-0 bg-black opacity-25" />
      <Dialog.Panel className="flex flex-col absolute z-[21] top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-base-100 border-base-300 border shadow-md rounded-3xl px-6 lg:px-8 py-6 lg:py-10 gap-4">
        <Dialog.Title>Place bid</Dialog.Title>
        <InputBase
          name="ipfsAdCreative"
          placeholder="Hash of the ipfs image to show in the ad"
          value={ipfsAdCreative}
          onChange={setIpfsAdCreative}
        />
        <InputBase
          name="adDestination"
          placeholder="Ad destination"
          value={adDestination}
          onChange={setAdDestination}
        />
        <IntegerInput
          name="adDuration"
          placeholder="Ad duration (in seconds)"
          value={adDuration}
          onChange={setAdDuration}
        />

        <EtherInput name="value" placeholder="bid amount" value={value} onChange={setValue} />

        <Actions>
          <button className="btn btn-secondary btn-sm" onClick={() => handleClose()}>
            Cancel
          </button>
          <button className="btn btn-primary btn-sm" onClick={() => writeAsync()}>
            Confirm
          </button>
        </Actions>
      </Dialog.Panel>
    </Dialog>
  );
};
