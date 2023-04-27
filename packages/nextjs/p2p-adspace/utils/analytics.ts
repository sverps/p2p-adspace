export enum EventType {
  VIEW,
  CLICK,
}

export type Event = {
  chainId: number;
  address: string;
  timestamp: number;
  type: EventType;
  adspaceIndex: string;
  bidIndex: string;
  userHash: string;
};
