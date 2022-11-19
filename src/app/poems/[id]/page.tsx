import React from "react";
import { Post } from "@prisma/client";
import Image from "next/image";
import prisma from "@/lib/prisma";

import { fetchApi } from "@/utils/apiHelper";
import {
  PoemParameters,
  PoemParametersType,
} from "@/components/PoemParameters";
import { Divider } from "@/components/common/Divider";

async function getPostByID(id: string) {
  // const response = await fetchApi(`poems/get-one/${id}`);
  // return response.json();

  try {
    const response = await prisma.post.findUnique({
      where: {
        id: String(id),
      },
    });

    return response;
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  } finally {
    await prisma.$disconnect();
  }
}

type PageProps = {
  params: { id: string };
};

export default async function Page({ params }: PageProps) {
  const { id } = params;

  const post: Post | null = await getPostByID(id as string);

  const replaceWhiteSpace = (str: string) =>
    str?.replaceAll(/\n\n/g, "\n").replaceAll(/\n/g, "<br />");

  return (
    <section className="h-screen">
      {post ? (
        <div className="max-w-md mx-auto text-gray-600 my-6">
          <h1 className="text-3xl font-light mb-4">{post.title}</h1>
          {post.imageUrl && (
            <Image
              className="rounded-lg shadow-lg"
              src={post.imageUrl}
              alt={`Image of ${post.title}`}
              width={500}
              height={500}
            />
          )}
          {post?.content && (
            <p
              className="text-xl italic my-8"
              dangerouslySetInnerHTML={{
                __html: replaceWhiteSpace(post?.content),
              }}
            />
          )}
          <p>By {post.author}</p>
          <Divider />
          <PoemParameters params={post.poemParams as PoemParametersType} />
        </div>
      ) : (
        <p>No post found</p>
      )}
    </section>
  );
}
