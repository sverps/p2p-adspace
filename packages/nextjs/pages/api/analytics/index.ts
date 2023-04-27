import { CustomRequest, CustomResponse, withMiddleware } from "~~/backend/middleware";
import { Event } from "~~/p2p-adspace/utils/analytics";

async function handlePostAnalytics(req: CustomRequest) {
  const event: Event = { chainId: 31337, ...req.body };
  await req.db.collection("events").insertOne(event);
}

async function handleGetAnalytics(req: CustomRequest, res: CustomResponse) {
  const filter: Partial<Event> = req.query;
  const events = await req.db.collection("events").find(filter).toArray();
  res.status(200).send(events ?? []);
}

async function handler(req: CustomRequest, res: CustomResponse) {
  console.log(`[${req.method}] ${req.url}`);
  if (req.method === "OPTIONS") {
    res
      .status(204)
      .setHeader("Access-Control-Allow-Origin", "*")
      .setHeader("Access-Control-Allow-Methods", "POST")
      .setHeader("Access-Control-Allow-Headers", "content-type")
      .send("OK");
  } else if (req.method === "POST") {
    await handlePostAnalytics(req);
    res.status(200).setHeader("Access-Control-Allow-Origin", "*").send("OK");
  } else if (req.method === "GET") {
    await handleGetAnalytics(req, res);
  } else {
    res.status(405).send("Method not allowed");
  }
}

export default withMiddleware(handler);
