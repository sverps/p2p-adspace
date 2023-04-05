import { EnrichedAcceptedBid } from "../hooks/useAcceptedBid";
import Countdown from "react-countdown";
import { RocketLaunchIcon } from "@heroicons/react/24/outline";

export enum Status {
  OPEN = "OPEN",
  ACTIVE = "ACTIVE",
  CLOSED = "CLOSED",
}

export const AdspaceStatus = ({
  acceptedBid,
  className = "",
  onTriggerRefetch,
}: {
  acceptedBid?: EnrichedAcceptedBid;
  className?: string;
  onTriggerRefetch: () => void;
}) => {
  let color: string;
  let Icon: any;
  let status: Status;
  if (!acceptedBid || acceptedBid.adEndTimestamp.toNumber() * 1000 < new Date().getTime()) {
    status = Status.OPEN;
    color = "bg-yellow";
  } else {
    Icon = RocketLaunchIcon;
    color = "bg-green";
    status = Status.ACTIVE;
  }

  return (
    <div className={`flex flex-col items-center gap-1 rounded-[1rem] ${color}-100 ${className ?? ""}`}>
      <div className={`flex items-center px-6 py-1 rounded-[1rem] ${color}-300`}>
        {Icon && <Icon className="w-5 h-5 mr-2" />}
        {status}
      </div>
      {status === Status.ACTIVE && acceptedBid && (
        <Countdown date={acceptedBid.adEndTimestamp.toNumber() * 1000 + 500} onComplete={onTriggerRefetch} />
      )}
    </div>
  );
};
