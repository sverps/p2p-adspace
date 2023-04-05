import { useState } from "react";
import { useAcceptedBid } from "../hooks/useAcceptedBid";
import { useBids } from "../hooks/useBids";
import { Actions } from "./Actions";
import { AdspaceStatus } from "./AdspaceStatus";
import { Bids } from "./Bids";
import { Dimensions, DimensionsInfo } from "./DimensionsInfo";
import { ImagePopover } from "./ImagePopover";
import { BigNumber } from "ethers";
import { ChevronDownIcon, ChevronUpIcon, LinkIcon } from "@heroicons/react/24/outline";

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
  const { data: bids } = useBids(data.index, data.bidIndex);
  const { data: acceptedBid, refetch } = useAcceptedBid(data.index, bids);

  return (
    <div className="flex flex-col gap-4 px-2 py-8 first:pt-0 last:pb-0">
      <div className="flex gap-4">
        <DimensionsInfo dimensions={data.dimensions} />
        <div className="flex-1 flex flex-col justify-start gap-3">
          <div className="flex w-full items-center">
            <div className="flex-1 flex items-center">
              <span className="font-bold">{data.url}</span>
              <a href={data.url} target="_blank" rel="noreferrer">
                <LinkIcon className="h-4 w-4 ml-2" />
              </a>
            </div>
            <AdspaceStatus acceptedBid={acceptedBid} onTriggerRefetch={refetch} />
          </div>
          <div className="flex w-full items-center">{`Dimensions: ${data.dimensions.x}px : ${data.dimensions.x}px`}</div>
          {acceptedBid ? (
            <div className="flex w-full items-center">
              <ImagePopover label="Creative" url={`https://ipfs.io/ipfs/${acceptedBid.ipfsAdCreative}`} />
            </div>
          ) : null}
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
