import prisma from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import {
  openaiTextResponseApi,
  openaiImageResponseApi,
} from "@/services/openaiApi";
import { uploadCloudinaryImage } from "@/services/cloudinary";
import { determineImageGenre } from "@/utils/detemineImageGenre";

// POST /api/post
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Check req is coming from secure place
  const token = req.headers.token as string;

  if (token !== process.env.POSTING_TOKEN) {
    res.status(401).json({ error: "Invalid token" });
    return;
  }

  try {
    const { subject } = req.body;

    const preamble =
      "Write a poem that is no more than 100 words long. Finish at a full stop. The poem should be about the following topic: ";

    const title = await openaiTextResponseApi(
      `Create an inspiring poem title about ${subject}, length is 6 words`
    );

    const author = await openaiTextResponseApi(
      `Write a first name and last name`
    );

    const content = await openaiTextResponseApi(`${preamble} ${subject}`);

    const imageUrl = await openaiImageResponseApi(
      `${content?.substring(0, 50)}, ${determineImageGenre()}`
    );

    // Posting image to cloudinary
    let cloudinaryImageUrl: string = "";
    if (imageUrl) {
      cloudinaryImageUrl = await uploadCloudinaryImage(imageUrl);
    }

    const result = await prisma.post.create({
      data: {
        title: title || "Untitled",
        content,
        author: author || "Anonymous",
        imageUrl: cloudinaryImageUrl,
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
