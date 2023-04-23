import { useState } from "react";
import { useAcceptedBid } from "../hooks/useAcceptedBid";
import { Adspace } from "../hooks/useAdspaces";
import { useBids } from "../hooks/useBids";
import { useSnippetGenerator } from "../hooks/useSnippetGenerator";
import { md } from "../utils/media";
import { Actions } from "./Actions";
import { AdspaceStatus } from "./AdspaceStatus";
import { Bids } from "./Bids";
import { DimensionsInfo } from "./DimensionsInfo";
import {
  ArrowLongRightIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  CodeBracketIcon,
  LinkIcon,
} from "@heroicons/react/24/outline";
import { Address } from "~~/components/scaffold-eth";

type AdspaceProps = {
  adspace: Adspace;
  onInitiateBid: () => void;
};

export const AdspaceView = ({ adspace, onInitiateBid }: AdspaceProps) => {
  const [expanded, setExpanded] = useState(false);
  const { data: bids } = useBids(adspace.index, adspace.bidIndex);
  const { data: acceptedBid, refetch } = useAcceptedBid(adspace.index, bids);

  const { copySnippet, justCopied } = useSnippetGenerator({ adspaceIndex: adspace.index });

  return (
    <div className="flex flex-col gap-4 px-2 py-8 first:pt-0 last:pb-0">
      <div className="flex gap-4 flex-col md:flex-row">
        <DimensionsInfo dimensions={adspace.dimensions} acceptedBid={acceptedBid} />
        <div className="flex-1 relative flex flex-col justify-start gap-2">
          <div className="flex items-center py-2">
            <Address address={adspace.owner} />
          </div>
          <span>{`Dimensions: ${adspace.dimensions.x}px : ${adspace.dimensions.y}px`}</span>
          <div className="flex items-center cursor-pointer" onClick={copySnippet}>
            <span>Embed</span>
            {justCopied ? (
              <CheckCircleIcon className="h-5 w-5 ml-2 text-sky-600" aria-hidden="true" />
            ) : (
              <CodeBracketIcon className="h-5 w-5 ml-2 text-sky-600" />
            )}
          </div>

          <div className="flex flex-col md:items-center md:justify-between md:flex-row">
            <a className="flex items-center" href={adspace.websiteUrl} target="_blank" rel="noreferrer">
              <span className="font-bold">{adspace.websiteUrl}</span>
              <LinkIcon className="h-5 w-5 ml-2 text-sky-600" />
            </a>
            {acceptedBid && (
              <>
                <ArrowLongRightIcon className="w-4 h-4" />
                <a className="flex items-center" href={acceptedBid.adDestinationUrl} target="_blank" rel="noreferrer">
                  <span className="font-bold">{acceptedBid.adDestinationUrl}</span>
                  <LinkIcon className="h-5 w-5 ml-2 text-sky-600" />
                </a>
              </>
            )}
          </div>
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
