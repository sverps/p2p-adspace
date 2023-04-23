import { Bid } from "../hooks/useBids";
import { formatDuration } from "../utils/time";
import { Actions } from "./Actions";
import { ImagePopover } from "./ImagePopover";
import { BigNumber, ethers } from "ethers";
import { Address } from "~~/components/scaffold-eth";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

type BidViewProps = {
  adspaceIndex: number;
  bid: Bid;
  accepted: boolean;
};

export const BidView = ({ adspaceIndex, bid, accepted }: BidViewProps) => {
  const { writeAsync } = useScaffoldContractWrite({
    contractName: "AdspaceMarketplace",
    functionName: "acceptBid",
    args: [BigNumber.from(adspaceIndex), BigNumber.from(bid.index)],
  });

  return (
    <div className={`flex flex-col w-full bg-slate-100 p-3 gap-1 ${accepted ? "border-2 border-green-400" : ""}`}>
      <Address address={bid.bidder} />
      <div>{`Ξ ${ethers.utils.formatEther(bid.bid)} / 🕑 ${bid.adDuration.toNumber()}`}</div>
      <div>{bid.adDestinationUrl}</div>
      <div>
        <ImagePopover url={`https://ipfs.io/ipfs/${bid.ipfsAdCreative}`} />
      </div>
      <Actions>
        <button
          disabled={accepted}
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
