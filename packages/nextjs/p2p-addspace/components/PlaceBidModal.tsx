import { useState } from "react";
import { useScaffoldContract } from "../hooks/useScaffoldContract";
import { Actions } from "./Actions";
import { Dialog } from "@headlessui/react";
import { BigNumber } from "ethers";
import { InputBase, IntegerInput } from "~~/components/scaffold-eth";

type PlaceBidModalProps = { contentSpaceIndex?: number; onClose: () => void };

export const PlaceBidModal = ({ contentSpaceIndex, onClose }: PlaceBidModalProps) => {
  const { contract, isLoading } = useScaffoldContract("AdspaceMarketplace");

  const [bid, setBid] = useState<BigNumber | string>();
  const [ipfsAdCreative, setIpfsAdCreative] = useState<string>();
  const [adDestination, setAdDestination] = useState<string>();

  const [value, setValue] = useState<BigNumber | string>();

  if (isLoading || !contract) {
    return null;
  }

  return (
    <Dialog open={typeof contentSpaceIndex === "number"} onClose={onClose} className="">
      <div className="absolute z-20 w-full h-full top-0 left-0 bg-black opacity-25" />
      <Dialog.Panel className="flex flex-col absolute z-[21] top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-base-100 border-base-300 border shadow-md rounded-3xl px-6 lg:px-8 py-6 lg:py-10 gap-4">
        <Dialog.Title>Place bid</Dialog.Title>
        {/* <Dialog.Description>This will permanently deactivate your account</Dialog.Description> */}

        <IntegerInput name="bid" placeholder="bid" value={bid} onChange={setBid} />
        <InputBase
          name="ipfsAdCreative"
          placeholder="ipfsAdCreative"
          value={ipfsAdCreative}
          onChange={setIpfsAdCreative}
        />
        <InputBase name="adDestination" placeholder="adDestination" value={adDestination} onChange={setAdDestination} />

        <IntegerInput name="value" placeholder="value" value={value} onChange={setValue} />

        <Actions>
          <button className="btn btn-secondary btn-sm" onClick={onClose}>
            Cancel
          </button>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => {
              if (
                bid === undefined ||
                ipfsAdCreative === undefined ||
                adDestination === undefined ||
                value === undefined
              ) {
                console.error("Invalid arguments for 'bid()'");
                return;
              }

              const args = [
                BigNumber.from(contentSpaceIndex),
                bid,
                ipfsAdCreative,
                adDestination,
                { value: BigNumber.from(value) },
              ] as const;

              contract.bid(...(args as [BigNumber, BigNumber, string, string, { value: BigNumber }]));
            }}
          >
            Confirm
          </button>
        </Actions>
      </Dialog.Panel>
    </Dialog>
  );
};
