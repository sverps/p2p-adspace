import { Bid } from "../hooks/useBids";
import { BidView } from "./BidView";
import { Transition } from "@headlessui/react";

type BidsProps = {
  bids?: Bid[];
  open: boolean;
  adspaceIndex: number;
};

export const Bids = ({ open, bids, adspaceIndex }: BidsProps) => {
  return (
    <Transition
      className="flex flex-col w-full gap-3"
      show={open}
      enter="transition-opacity duration-150" // TODO: add height transition
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-100"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      {bids?.map((bid, index) => (
        <BidView key={index} bid={bid} adspaceIndex={adspaceIndex} />
      ))}
    </Transition>
  );
};
