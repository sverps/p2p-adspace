import crypto from "crypto";
import { NextApiRequest } from "next";

export function getUserHash(req: NextApiRequest) {
  const identifyer = `${req.socket.remoteAddress}${req.headers["user-agent"]}`;
  return crypto.createHash("sha256").update(identifyer).digest("hex");
}
