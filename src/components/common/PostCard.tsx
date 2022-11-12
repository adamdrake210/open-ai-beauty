import { Post } from "@prisma/client";
import Image from "next/image";
import React from "react";

type PostCardProps = {
  post: Post;
};

export const PostCard = ({ post }: PostCardProps) => {
  const { imageUrl, title, content } = post;

  return (
    <div className="rounded mb-8 overflow-hidden shadow-lg lg:h-[450px]">
      {imageUrl && (
        <Image
          src={imageUrl}
          alt={`Image of ${title}`}
          width={500}
          height={500}
        />
      )}
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{`${title?.substring(
          0,
          30
        )}...`}</div>
        <p className="text-gray-700 text-base">
          {`${content?.substring(0, 40)}...`}
        </p>
      </div>
    </div>
  );
};
