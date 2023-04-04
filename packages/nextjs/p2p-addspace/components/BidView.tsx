import { Bid } from "../hooks/useBids";
import { Actions } from "./Actions";
import { ImagePopover } from "./ImagePopover";
import { BigNumber, ethers } from "ethers";
import { Address } from "~~/components/scaffold-eth";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

type BidViewProps = {
  adspaceIndex: number;
  bid: Bid;
};

export const BidView = ({ adspaceIndex, bid }: BidViewProps) => {
  const { writeAsync } = useScaffoldContractWrite({
    contractName: "AdspaceMarketplace",
    functionName: "acceptBid",
    args: [BigNumber.from(adspaceIndex), BigNumber.from(bid.index)],
  });

  return (
    <div className="w-full bg-slate-100 p-3">
      <Address address={bid.bidder} />
      <div>{`Ξ ${ethers.utils.formatEther(bid.bid)}`}</div>
      <div>{bid.adDestinationUrl}</div>
      <div>
        <ImagePopover url={`https://ipfs.io/ipfs/${bid.ipfsAdCreative}`} />
      </div>
      <Actions>
        <button
          className="btn btn-secondary btn-sm"
          onClick={() => {
            writeAsync();
          }}
        >
          <span>Accept</span>
        </button>
      </Actions>
    </div>
  );
};
