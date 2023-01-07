import { NextApiRequestCookies } from "next/dist/server/api-utils";
import jwt from "jsonwebtoken";
import { IncomingMessage } from "http";

export async function userFromRequest(
  req: IncomingMessage & { cookies: NextApiRequestCookies }
): Promise<any> {
  const { Authentication: token } = req.cookies;
  console.log("🚀 ~ file: tokens.ts:9 ~ token", token);

  if (!token) return undefined;

  try {
    const data = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_TOKEN_KEY!);
    console.log("🚀 ~ file: tokens.ts:15 ~ data", data);

    if (!data) return undefined;

    return data;
  } catch (error) {
    return undefined;
  }
}
