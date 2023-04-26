import { Db } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { withMiddleware } from "~~/backend/middleware";

async function handlePostAnalytics(req: NextApiRequest & { db: Db }, res: NextApiResponse) {
  req.db.collection("events");
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log(`[${req.method}] ${req.url}`);
  if (!req.method || ["OPTIONS", "POST"].includes(req.method)) {
    res.status(405).send("Method not allowed");
  }
  if (req.method === "OPTIONS") {
    res
      .status(204)
      .setHeader("Access-Control-Allow-Origin", "*")
      .setHeader("Access-Control-Allow-Methods", "POST")
      .setHeader("Access-Control-Allow-Headers", "content-type")
      .send("OK");
  } else {
    await handlePostAnalytics(req, res);
  }
}

export default withMiddleware(handler);
