import { useState } from "react";
import { useAcceptedBid } from "../hooks/useAcceptedBid";
import { useBids } from "../hooks/useBids";
import { Actions } from "./Actions";
import { Bids } from "./Bids";
import { Dimensions, DimensionsInfo } from "./DimensionsInfo";
import { BigNumber } from "ethers";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";

type AdspaceProps = {
  data: {
    index: number;
    dimensions: Dimensions;
    url: string;
    bidIndex: BigNumber;
  };
  onInitiateBid: () => void;
};

export const Adspace = ({ data, onInitiateBid }: AdspaceProps) => {
  const [expanded, setExpanded] = useState(false);
  const { data: acceptedBid } = useAcceptedBid(data.index);
  const { data: bids } = useBids(data.index, data.bidIndex);

  return (
    <div className="flex flex-col gap-4 px-2 py-8 first:pt-0 last:pb-0">
      <div className="flex gap-4">
        <DimensionsInfo dimensions={data.dimensions} />
        <div className="flex-1 flex flex-col justify-start gap-4">
          <div className="flex w-full items-center">
            <div className="flex-1">
              <div className="font-bold">{data.url}</div>
            </div>
          </div>
        </div>
      </div>
      <Actions>
        <button disabled={!bids?.length} className="btn btn-secondary btn-sm" onClick={() => setExpanded(!expanded)}>
          {expanded ? <ChevronUpIcon className="h-5 w-5 mr-2" /> : <ChevronDownIcon className="h-5 w-5 mr-2" />}
          <span>
            {expanded
              ? `Hide bid${bids?.length !== 1 ? "s" : ""}`
              : `See ${bids?.length} bid${bids?.length !== 1 ? "s" : ""}`}
          </span>
        </button>
        <button className="btn btn-secondary btn-sm" onClick={onInitiateBid}>
          Place bid
        </button>
      </Actions>
      <Bids open={expanded} bids={bids} adspaceIndex={data.index} acceptedBid={acceptedBid} />
    </div>
  );
};
