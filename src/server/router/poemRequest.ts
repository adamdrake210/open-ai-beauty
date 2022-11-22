import { router, publicProcedure } from "../trpc";
import { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { prisma } from "@/server/prisma";
import {
  determineImageGenre,
  determinePoemStyle,
  determinePoetInspiration,
} from "@/utils/generatingVariables";
import {
  openaiImageResponseApi,
  openaiTextResponseApi,
} from "@/services/openaiApi";
import { uploadCloudinaryImage } from "@/services/cloudinary";

/**
 * Default selector for poemRequest.
 * It's important to always explicitly say which fields you want to return in order to not leak extra information
 * @see https://github.com/prisma/prisma/issues/9353
 */
const defaultPoemRequestSelect = Prisma.validator<Prisma.PostSelect>()({
  id: true,
  title: true,
  content: true,
  imageUrl: true,
  published: true,
  author: true,
  poemParams: true,
  createdAt: true,
  updatedAt: true,
});

export const poemRequestRouter = router({
  list: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.string().nullish(),
      })
    )
    .query(async ({ input }) => {
      /**
       * For pagination docs you can have a look here
       * @see https://trpc.io/docs/useInfiniteQuery
       * @see https://www.prisma.io/docs/concepts/components/prisma-client/pagination
       */

      const limit = input.limit ?? 50;
      const { cursor } = input;

      const items = await prisma.post.findMany({
        select: defaultPoemRequestSelect,
        // get an extra item at the end which we'll use as next cursor
        take: limit + 1,
        where: {},
        cursor: cursor
          ? {
              id: cursor,
            }
          : undefined,
        orderBy: {
          createdAt: "desc",
        },
      });
      let nextCursor: typeof cursor | undefined = undefined;
      if (items.length > limit) {
        // Remove the last item and use it as next cursor

        const nextItem = items.pop()!;
        nextCursor = nextItem.id;
      }

      return {
        items: items.reverse(),
        nextCursor,
      };
    }),
  getOne: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      console.log(
        "🚀 ~ file: poemRequest.ts ~ line 93 ~ getOne:publicProcedure.input ~ input",
        input
      );
      const item = await prisma.post.findUnique({
        where: {
          id: input.id,
        },
        select: defaultPoemRequestSelect,
      });
      if (!item) {
        throw new TRPCError({
          code: "NOT_FOUND",
        });
      }
      return item;
    }),
  add: publicProcedure
    .input(
      z.object({
        token: z.string(),
        subject: z.string().min(1).max(100),
      })
    )
    .mutation(async ({ input }) => {
      const poet = determinePoetInspiration();
      const poemStyle = determinePoemStyle();

      const preamble = `Create a new poem that is in the style of ${poet}. The number of syllables for each line of verse will be 9. The poem will be a ${poemStyle}. The poem will be about the following topic: `;

      const title = await openaiTextResponseApi(
        `Create a unique poem title about ${input.subject}.`
      );

      const author = await openaiTextResponseApi(
        `Write a first name and last name`
      );

      const content = await openaiTextResponseApi(
        `${preamble} ${input.subject}`
      );

      const imageUrl = await openaiImageResponseApi(
        `${content?.substring(0, 50)}, ${determineImageGenre()}`
      );

      // Posting image to cloudinary
      let cloudinaryImageUrl: string = "";
      if (imageUrl) {
        cloudinaryImageUrl = await uploadCloudinaryImage(imageUrl);
      }

      const poemParams = {
        poemRequest: `${preamble} ${input.subject}`,
        poetInspiration: poet,
        poemStyle,
      };

      const chemicalRequest = await prisma.post.create({
        data: {
          title: title || "Untitled",
          content: content || "No content",
          author: author || "Anonymous",
          imageUrl: cloudinaryImageUrl,
          published: true,
          poemParams,
        },
        select: defaultPoemRequestSelect,
      });
      return chemicalRequest;
    }),
});
