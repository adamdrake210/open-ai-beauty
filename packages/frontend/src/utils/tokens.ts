import { NextApiRequestCookies } from "next/dist/server/api-utils";
import jwt from "jsonwebtoken";
import { IncomingMessage } from "http";

export async function userFromRequest(
  req: IncomingMessage & { cookies: NextApiRequestCookies }
): Promise<any> {
  const { Authentication: token } = req.cookies;
  if (!token) return undefined;

  try {
    const data = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_TOKEN_KEY!);

    if (!data) return undefined;

    return data;
  } catch (error) {
    return undefined;
  }
}
