import { PhotoIcon } from "@heroicons/react/24/outline";

export type Dimensions = { x: number; y: number };

type DimensionsInfoProps = { dimensions: Dimensions };

export const DimensionsInfo = ({ dimensions }: DimensionsInfoProps) => {
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
    <div className="w-36 h-36 flex items-center justify-center bg-base-200 p-4">
      <div
        className={`flex items-center justify-center bg-base-300 ${getAspectRatioStyle()} relative overflow-visible`}
      >
        <PhotoIcon className="absolute h-6 w-6 top-[calc(50%-12px)] text-blue-500" />
        <span className="self-end whitespace-nowrap">{`${dimensions.x} : ${dimensions.y}`}</span>
      </div>
    </div>
  );
};
