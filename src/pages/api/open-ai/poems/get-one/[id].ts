import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

// GET /api/open-ai/get-all
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Check req is coming from secure place
  const token = req.headers.token as string;

  if (token !== process.env.NEXT_PUBLIC_POSTING_TOKEN) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const { id } = req.query;

  try {
    const post = await prisma.post.findUnique({
      where: {
        id: String(id),
      },
    });

    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    res.status(500);
    return Promise.reject(error);
  } finally {
    await prisma.$disconnect();
  }
}
