import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

if (!process.env.JWT_SECRET) {
  console.error("Missing `JWT_SECRET` in `package/nextjs/.env.local`");
  process.exit(0);
}

export type WithAuth = { user: { address: string } };

export function withAuth<T extends NextApiRequest>(
  handler: (req: T & WithAuth, res: NextApiResponse) => Promise<void>,
) {
  return (req: any, res: any) => {
    const authHeader = req.headers["authorization"] as string;
    if (!authHeader) {
      res.status(401).end();
      return;
    }
    try {
      const decoded = jwt.verify(authHeader.substring("Bearer ".length), process.env.JWT_SECRET!) as {
        address: string;
      };
      req.user = { address: decoded.address };
    } catch (err) {
      console.error(err);
      res.status(500).end();
    }
    return handler(req, res);
  };
}
