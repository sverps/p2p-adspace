import { withDatabase } from "./database";

const middleware = [withDatabase];

export function withMiddleware(handler: (req: any, res: any) => void) {
  return (req: any, res: any) => {
    middleware.reduce((acc, m) => m(acc), handler)(req, res);
  };
}
