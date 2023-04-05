import { useState } from "react";
import { useAcceptedBid } from "../hooks/useAcceptedBid";
import { Adspace } from "../hooks/useAdspaces";
import { useBids } from "../hooks/useBids";
import { Actions } from "./Actions";
import { AdspaceStatus } from "./AdspaceStatus";
import { Bids } from "./Bids";
import { DimensionsInfo } from "./DimensionsInfo";
import { ImagePopover } from "./ImagePopover";
import { ChevronDownIcon, ChevronUpIcon, LinkIcon } from "@heroicons/react/24/outline";
import { Address } from "~~/components/scaffold-eth";

type AdspaceProps = {
  adspace: Adspace;
  onInitiateBid: () => void;
};

export const AdspaceView = ({ adspace, onInitiateBid }: AdspaceProps) => {
  const [expanded, setExpanded] = useState(false);
  const { data: bids } = useBids(adspace.index, adspace.bidIndex);
  const { data: acceptedBid, refetch } = useAcceptedBid(adspace.index, bids);

  return (
    <div className="flex flex-col gap-4 px-2 py-8 first:pt-0 last:pb-0">
      <div className="flex gap-4">
        <DimensionsInfo dimensions={adspace.dimensions} />
        <div className="flex-1 relative flex flex-col justify-start gap-3">
          <div className="flex items-center">
            <Address address={adspace.owner} />
          </div>
          <div className="flex items-center">
            <span className="font-bold">{adspace.websiteUrl}</span>
            <a href={adspace.websiteUrl} target="_blank" rel="noreferrer">
              <LinkIcon className="h-4 w-4 ml-2" />
            </a>
          </div>
          <div className="flex w-full items-center">{`Dimensions: ${adspace.dimensions.x}px : ${adspace.dimensions.y}px`}</div>
          {acceptedBid ? (
            <div className="flex w-full items-center">
              <ImagePopover label="Creative" url={`https://ipfs.io/ipfs/${acceptedBid.ipfsAdCreative}`} />
            </div>
          ) : null}
          <AdspaceStatus acceptedBid={acceptedBid} onTriggerRefetch={refetch} className="absolute top-0 right-0" />
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
      <Bids open={expanded} bids={bids} adspaceIndex={adspace.index} acceptedBid={acceptedBid} />
    </div>
  );
};
