import React from "react";
import Image from "next/image";
import { Post } from "@prisma/client";
import { Divider } from "./common/Divider";
import { PoemParameters, PoemParametersType } from "./PoemParameters";

type PoemProps = {
  post: Post;
};

export const Poem = ({ post }: PoemProps) => {
  const replaceWhiteSpace = (str: string) =>
    str?.replaceAll(/\n\n/g, "\n").replaceAll(/\n/g, "<br />");

  return (
    <div className="max-w-md mx-auto text-gray-600 my-6">
      <h1 className="text-3xl font-light mb-4">{post?.title}</h1>
      {post?.imageUrl && (
        <Image
          className="rounded-lg shadow-lg"
          src={post.imageUrl}
          alt={`Image of ${post.title}`}
          width={500}
          height={500}
        />
      )}
      <div className="mb-4 md:my-8 px-8 md:px-2">
        <p
          className="text-xl italic"
          dangerouslySetInnerHTML={{
            __html: replaceWhiteSpace(post?.content),
          }}
        />
        <p>By {post?.author}</p>
      </div>
      <Divider />

      <PoemParameters params={post?.poemParams as PoemParametersType} />
      <Divider />
    </div>
  );
};
