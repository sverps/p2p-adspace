import { EnrichedAcceptedBid } from "../hooks/useAcceptedBid";
import { PhotoIcon } from "@heroicons/react/24/outline";

export type Dimensions = { x: number; y: number };

type DimensionsInfoProps = { dimensions: Dimensions; acceptedBid?: EnrichedAcceptedBid };

export const DimensionsInfo = ({ dimensions, acceptedBid }: DimensionsInfoProps) => {
  const getAspectRatioStyle = () => {
    if (dimensions.x > dimensions.y) {
      return "w-32 h-16";
    }
    if (dimensions.x < dimensions.y) {
      return "w-16 h-32";
    }
    return "w-20 h-20";
  };

  return (
    <div className={`relative flex items-center justify-center bg-base-300 ${getAspectRatioStyle()} overflow-visible`}>
      {acceptedBid ? (
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backgroundImage: `url(https://ipfs.io/ipfs/${acceptedBid.ipfsAdCreative})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        />
      ) : (
        <>
          <PhotoIcon className="absolute h-6 w-6 top-[calc(50%-12px)] text-blue-500" />
          <span className="self-end whitespace-nowrap">{`${dimensions.x} : ${dimensions.y}`}</span>
        </>
      )}
    </div>
  );
};
