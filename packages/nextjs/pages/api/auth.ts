import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import { SiweMessage, generateNonce } from "siwe";
import { WithDb, withDatabase } from "~~/backend/database";

async function handleGetNonce(req: NextApiRequest & WithDb, res: NextApiResponse) {
  const address = req.query.address;
  if (!address) {
    res.status(400).send("No address found in query.");
    return;
  }
  const user = await req.db.collection("users").findOne({ address });
  if (user) {
    res.status(200).send(user.nonce);
    return;
  }
  const nonce = generateNonce();
  await req.db.collection("users").insertOne({ address, nonce });
  res.status(200).send(nonce);
}

async function handleAuthenticate(req: NextApiRequest & WithDb, res: NextApiResponse) {
  if (!req.body.message) {
    res.status(422).json({ message: "Expected prepareMessage object as body." });
    return;
  }
  const SiweObject = new SiweMessage(req.body.message);
  const user = await req.db.collection("users").findOne({ address: SiweObject.address });

  if (!user) {
    res.status(400).send("No matching user found for message.");
    return;
  }

  const { data: message } = await SiweObject.verify({ signature: req.body.signature, nonce: user.nonce });
  res.status(200).json({ token: jwt.sign({ address: message.address }, process.env.JWT_SECRET!) });
}

async function handler(req: NextApiRequest & WithDb, res: NextApiResponse) {
  console.log(`[${req.method}] ${req.url}`);
  if (req.method === "GET") {
    await handleGetNonce(req, res);
  } else if (req.method === "POST") {
    await handleAuthenticate(req, res);
  } else {
    res.status(405).send("Method not allowed");
  }
}

export default withDatabase(handler);
