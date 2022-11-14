import prisma from "@/lib/prisma";
import { Post } from "@prisma/client";

async function getPostByID(id: string) {
  const post = await prisma.post.findUnique({
    where: {
      id,
    },
  });
  return post;
}

type HeadProps = {
  params: { id: string };
};

export default async function Head({ params }: HeadProps) {
  const { id } = params;

  const post: Post | null = await getPostByID(id as string);

  return (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>{post?.title}</title>
    </>
  );
}
