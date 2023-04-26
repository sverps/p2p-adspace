import { MongoClient } from "mongodb";

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

export function withDatabase(handler: (req: any, res: any) => void) {
  return (req: any, res: any) => {
    req.dbClient = client;
    req.db = client.db(process.env.MONGODB_NAME);
    handler(req, res);
  };
}
