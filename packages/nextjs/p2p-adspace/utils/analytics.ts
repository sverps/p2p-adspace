export enum EventType {
  VIEW,
  CLICK,
}

export type Event = {
  timestamp: number;
  type: EventType;
  adspaceIndex: string;
  bidIndex: string;
  userHash: string;
};
