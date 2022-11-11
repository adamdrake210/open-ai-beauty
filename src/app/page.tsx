import React from "react";
import Image from "next/image";
import { Post } from "@prisma/client";

async function getOpenAiPosts() {
  const response = await fetch("http://localhost:3000/api/open-ai/get-all", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
}

export default async function Page() {
  const posts = await getOpenAiPosts();

  const firstPost: Post = posts[1];

  return (
    <div>
      <h2 className="text-3xl font-bold underline">{firstPost.title}</h2>
      {firstPost.imageUrl && (
        <Image
          src={firstPost.imageUrl}
          alt={`Picture of ${firstPost.title}`}
          width={500}
          height={500}
        />
      )}
      <p>{firstPost.content}</p>
      <p>By {firstPost.author}</p>
      {/* @ts-ignore */}
      <p>By: {firstPost.createdAt}</p>
    </div>
  );
}
