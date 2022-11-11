// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ name: "John Doe" });
}

// POST endpoint to trigger the OpenAI API
// Backend to make a call to api (needs trigger)
// data is returned and saved to DB
// FE just renders the data from DB
