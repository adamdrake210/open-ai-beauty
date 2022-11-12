import React from "react";
import { Post } from "@prisma/client";
import Link from "next/link";

import { PostCard } from "@/components/common/PostCard";
import Head from "next/head";

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
  const posts: Post[] = await getOpenAiPosts();

  return (
    <section className="p-4">
      <h1 className="my-4">Poems by AI</h1>
      <div className="grid my-6 grid-cols-1 lg:grid-cols-3 lg:gap-8">
        {posts.reverse().map((post: Post) => (
          <Link
            key={post.id}
            href={`/poems/${post.id}`}
            className="max-w-md flex justify-self-center"
          >
            <PostCard post={post} />
          </Link>
        ))}
      </div>
    </section>
  );
}
