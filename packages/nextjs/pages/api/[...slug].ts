import { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "redis";
import { Event } from "~~/p2p-adspace/utils/analytics";

if (!process.env.REDIS_URI) {
  console.error("Missing `REDIS_URI` in `package/nextjs/.env.local`");
  process.exit(0);
}

const redis = createClient({
  url: process.env.REDIS_URI,
});
redis.on("error", (err: any) => console.log("Redis Client Error", err));

async function withRedis<T>(callback: () => Promise<T>): Promise<T> {
  await redis.connect();
  const result = await callback();
  await redis.disconnect();
  return result;
}

async function getEvents(key: string): Promise<Event[] | undefined> {
  try {
    const eventsString = await redis.get(key);
    const events = eventsString ? JSON.parse(eventsString) : undefined;
    return Array.isArray(events) ? events : [];
  } catch (err) {
    console.log(err);
    await redis.del(key);
    return [];
  }
}

async function addEvent(key: string, event: Event) {
  const events = (await getEvents(key)) ?? [];
  await redis.set(key, JSON.stringify([...events, event]));
}

async function handlePostEvent({ chainId, event }: { chainId: number; event: Omit<Event, "timestamp"> }) {
  const key = `${chainId}-${event.adspaceIndex}-${event.bidIndex}`;
  await withRedis(() => addEvent(key, { ...event, timestamp: new Date().getTime() }));
  return { success: true };
}

async function handleGetEvents(key: string) {
  return withRedis(() => getEvents(key));
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log(`[${req.method}] ${req.url}`);
  const slug = req.query.slug as string[];

  if (slug[0] === "analytics") {
    if (!slug[1] && req.method === "OPTIONS") {
      res
        .status(200)
        .setHeader("Access-Control-Allow-Origin", "*")
        .setHeader("Access-Control-Allow-Methods", "POST")
        .setHeader("Access-Control-Allow-Headers", "content-type")
        .send("OK");
    } else if (!slug[1] && req.method === "POST") {
      const responseData = await handlePostEvent({ chainId: 31337, event: req.body });
      res
        .status(responseData ? 200 : 404)
        .setHeader("Access-Control-Allow-Origin", "*")
        .send(responseData ? responseData : "Not found");
    } else if (slug[1] && req.method === "GET") {
      const responseData = await handleGetEvents(slug[1]);
      res.status(responseData ? 200 : 404).send(responseData ? responseData : "Not found");
    }
  } else {
    res.status(400).send("Wrong endpoint or method");
  }
}
