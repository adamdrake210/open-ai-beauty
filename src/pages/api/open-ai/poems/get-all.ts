import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

// GET /api/open-ai/get-all
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Check req is coming from secure place
  const token = req.headers.token as string;

  if (token !== process.env.POSTING_TOKEN) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  try {
    const posts = await prisma.post.findMany({
      where: {
        published: true,
      },
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
    });

    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500);
    return Promise.reject(error);
  } finally {
    await prisma.$disconnect();
  }
}
