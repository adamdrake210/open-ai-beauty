import prisma from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import {
  openaiTextResponseApi,
  openaiImageResponseApi,
} from "@/services/openaiApi";

// POST /api/post
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = req.headers.token as string;

  if (token !== process.env.POSTING_TOKEN) {
    res.status(401).json({ error: "Invalid token" });
    return;
  }

  const { subject } = req.body;

  const preamble =
    "Create a deep and meaningful poem that is no more than 100 words long. Finish at a full stop '.' The poem should be about the following topic: ";

  const title = await openaiTextResponseApi(
    `Create an inspiring poem title about ${subject}, no more than 6 words`
  );

  const content = await openaiTextResponseApi(`${preamble} ${subject}`);

  const imageUrl = await openaiImageResponseApi(
    `${content?.substring(0, 50)}, water color pencil drawing`
  );

  const author = await openaiTextResponseApi(
    `Return a random first and last name`
  );

  // TODO
  // Post to cloudinary here and get image url
  // Put some token check here.

  try {
    const result = await prisma.post.create({
      data: {
        title: title || "Untitled",
        content,
        author: author || "Anonymous",
        imageUrl,
        published: true,
      },
    });

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500);
    return Promise.reject(error);
  } finally {
    await prisma.$disconnect();
  }
}
