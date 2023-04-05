import { AcceptedBid } from "../hooks/useAcceptedBid";
import { RocketLaunchIcon } from "@heroicons/react/24/outline";

export enum Status {
  OPEN = "OPEN",
  ACTIVE = "ACTIVE",
  CLOSED = "CLOSED",
}

export const AdspaceStatus = ({ acceptedBid, className = "" }: { acceptedBid?: AcceptedBid; className?: string }) => {
  const classes: string[] = [className];
  let label: string;
  let Icon: any;
  if (!acceptedBid || acceptedBid.adEndTimestamp.toNumber() * 1000 < new Date().getTime()) {
    label = Status.OPEN;
    classes.unshift("bg-yellow-300");
  } else {
    Icon = RocketLaunchIcon;
    label = Status.ACTIVE;
    classes.unshift("bg-green-300");
  }

  return (
    <div className={`flex items-center px-4 py-1 rounded-full ${classes.join(" ")}`}>
      {Icon && <Icon className="w-5 h-5 mr-2" />}
      {label}
    </div>
  );
};
