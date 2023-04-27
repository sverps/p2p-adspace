import { NextApiRequest, NextApiResponse } from "next";
import { WithAuth, withAuth } from "~~/backend/auth";
import { WithDb, withDatabase } from "~~/backend/database";
import { getUserHash } from "~~/backend/utils";
import { EventSchema, parseSchema } from "~~/backend/validation";
import { Event } from "~~/p2p-adspace/utils/analytics";

async function handlePostAnalytics(req: NextApiRequest & WithDb, res: NextApiResponse) {
  const event: Pick<Event, keyof typeof EventSchema> = parseSchema(req.body, EventSchema);
  await req.db
    .collection("events")
    .insertOne({ ...event, userHash: getUserHash(req), timestamp: new Date().getTime() });
  res.status(200).setHeader("Access-Control-Allow-Origin", "*").send({ status: "OK" });
}

async function handleGetAnalytics(req: NextApiRequest & WithDb & WithAuth, res: NextApiResponse) {
  const filter: Partial<Event> = parseSchema(req.query, EventSchema);
  const events = await req.db
    .collection("events")
    .find({ ...filter })
    .toArray();
  res.status(200).send(events ?? []);
}

async function handler(req: NextApiRequest & WithDb, res: NextApiResponse) {
  console.log(`[${req.method}] ${req.url}`);
  if (req.method === "OPTIONS") {
    res
      .status(204)
      .setHeader("Access-Control-Allow-Origin", "*")
      .setHeader("Access-Control-Allow-Methods", "POST")
      .setHeader("Access-Control-Allow-Headers", "content-type")
      .end();
  } else if (req.method === "POST") {
    await handlePostAnalytics(req, res);
  } else if (req.method === "GET") {
    await withAuth(handleGetAnalytics)(req, res);
  } else {
    res.status(405).send("Method not allowed");
  }
}

export default withDatabase(handler);
