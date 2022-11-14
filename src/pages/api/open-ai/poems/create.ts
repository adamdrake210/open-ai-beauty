import prisma from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import {
  openaiTextResponseApi,
  openaiImageResponseApi,
} from "@/services/openaiApi";
import { uploadCloudinaryImage } from "@/services/cloudinary";
import {
  determineImageGenre,
  determinePoemStyle,
  determinePoetInspiration,
} from "@/utils/generatingVariables";

// POST /api/post
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
    const { subject } = req.body;

    const preamble = `Write a poem that is in the style of ${determinePoetInspiration()}. The number of syllables for each line of verse will be 9. The poem will be a ${determinePoemStyle}. The poem will be about the following topic: `;

    const title = await openaiTextResponseApi(
      `Create a unique poem title about ${subject}.`
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
