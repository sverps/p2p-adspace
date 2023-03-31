import { Actions } from "./Actions";
import { Dimensions, DimensionsInfo } from "./DimensionsInfo";

type ContentSpaceProps = {
  data: {
    dimensions: Dimensions;
    url: string;
    costPerClick: number;
  };
};

export const ContentSpace = ({ data }: ContentSpaceProps) => {
  return (
    <div className="flex flex-col gap-4 px-2 py-8 first:pt-0 last:pb-0">
      <div className="flex gap-4">
        <DimensionsInfo dimensions={data.dimensions} />
        <div className="flex-1 flex flex-col justify-start gap-4">
          <div className="flex w-full items-center">
            <div className="flex-1">
              <div className="font-bold">{data.url}</div>
            </div>
            <div>
              <div>{`Active: ${data.costPerClick}`}</div>
            </div>
          </div>
        </div>
      </div>
      <Actions>
        <button className="btn btn-secondary btn-sm">Sign tx</button>
        <button className="btn btn-secondary btn-sm" disabled={true}>
          Send tx
        </button>
      </Actions>
    </div>
  );
};
