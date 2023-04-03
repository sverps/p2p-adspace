import { useBids } from "../hooks/useBids";
import { Actions } from "./Actions";
import { Dimensions, DimensionsInfo } from "./DimensionsInfo";
import { BigNumber } from "ethers";

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
            {/* <div>
              <div>{`Active: ${data.costPerClick}`}</div>
            </div> */}
          </div>
        </div>
      </div>
      <div>
        {bids?.length
          ? bids.map((bid, index) => (
              <div key={index}>
                <div>{bid.bidder}</div>
                <div>{bid.bid.toNumber()}</div>
                <div>{bid.adDestinationUrl}</div>
                <div>{bid.ipfsAdCreative}</div>
              </div>
            ))
          : "No bids yet"}
      </div>
      <Actions>
        <button className="btn btn-secondary btn-sm" onClick={onInitiateBid}>
          Place bid
        </button>
      </Actions>
    </div>
  );
};
