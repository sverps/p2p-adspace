import { withDatabase } from "./database";
import { Db, MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

const middleware = [withDatabase];

export type CustomRequest = NextApiRequest & { db: Db; dbClient: MongoClient };
export type CustomResponse = NextApiResponse;

export function withMiddleware(handler: (req: any, res: any) => void) {
  return (req: NextApiRequest, res: NextApiResponse) => {
    middleware.reduce((acc, m) => m(acc), handler)(req, res);
  };
}
