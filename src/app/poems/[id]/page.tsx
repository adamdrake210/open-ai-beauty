import React from "react";
import { Post } from "@prisma/client";
import Image from "next/image";

import { fetchApi } from "@/utils/apiHelper";

async function getPostByID(id: string) {
  const response = await fetchApi(`poems/get-one/${id}`);
  return response.json();
}

type PageProps = {
  params: { id: string };
};

export default async function Page({ params }: PageProps) {
  const { id } = params;

  const post: Post | null = await getPostByID(id as string);

  return (
    <section className="p-4">
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
          <p className="text-xl italic my-8">{post.content}</p>
          <p>By {post.author}</p>
        </div>
      ) : (
        <p>No post found</p>
      )}
    </section>
  );
}
