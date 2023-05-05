import crypto from "crypto";
import dayjs from "dayjs";
import { NextApiRequest } from "next";
import { Event } from "~~/p2p-adspace/utils/analytics";

export function getUserHash(req: NextApiRequest) {
  const identifyer = `${req.socket.remoteAddress}${req.headers["user-agent"]}`;
  return crypto.createHash("sha256").update(identifyer).digest("hex");
}

export function processEvents(events: Event[]) {
  const grouped = new Map<string, { clicks: Event[]; views: Event[] }>();
  events.forEach(event => {
    const day = dayjs(event.timestamp).startOf("day").toISOString();
    const { clicks, views } = grouped.get(day) ?? { clicks: [], views: [] };
    grouped.set(
      day,
      event.type === 0 ? { clicks, views: views.concat(event) } : { clicks: clicks.concat(event), views },
    );
  });
  return grouped;
}
