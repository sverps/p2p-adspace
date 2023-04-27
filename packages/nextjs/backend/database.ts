import { Db, MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

if (!process.env.MONGODB_URI) {
  console.error("Missing `MONGODB_URI` in `package/nextjs/.env.local`");
  process.exit(0);
}
if (!process.env.MONGODB_NAME) {
  console.error("Missing `MONGODB_NAME` in `package/nextjs/.env.local`");
  process.exit(0);
}

// Connection URL
const client = new MongoClient(process.env.MONGODB_URI);

export type CustomRequest = NextApiRequest & { db: Db; dbClient: MongoClient };
export type CustomResponse = NextApiResponse;

export function withDatabase(handler: (req: CustomRequest, res: CustomResponse) => Promise<void>) {
  return (req: any, res: any) => {
    req.dbClient = client;
    req.db = client.db(process.env.MONGODB_NAME);
    return handler(req, res);
  };
}
