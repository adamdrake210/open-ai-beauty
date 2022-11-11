import React from "react";
import { Post } from "@prisma/client";
import Link from "next/link";

import { PostCard } from "@/components/common/PostCard";

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
    <div className="text-gray-600">
      <h1 className="text-3xl font-light my-4">Poems by AI</h1>
      <div className="grid grid-cols-3 gap-4 my-6">
        {posts.reverse().map((post: Post) => (
          <Link key={post.id} href={`/poems/${post.id}`}>
            <PostCard post={post} />
          </Link>
        ))}
      </div>
    </div>
  );
}
