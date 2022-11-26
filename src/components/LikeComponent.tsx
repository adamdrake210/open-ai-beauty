import { useLocalStorage } from "@/hooks/useLocalStorage";
import { trpc } from "@/utils/trpc";
import React, { useState } from "react";

type LikeComponentProps = {
  id: string;
  count: number;
};

export const LikeComponent = ({ id, count }: LikeComponentProps) => {
  const [storedUserLiked, setStoredUserLiked] = useLocalStorage(
    `userliked_${id}`,
    false
  );

  const [localCount, setLocalCount] = useState(count);
  // const [userLiked, setUserLiked] = useState(storedUserLiked);

  const { mutateAsync } = trpc.poemRequest.updatePost.useMutation({});

  const handleLikeCount = async () => {
    try {
      setLocalCount(localCount + 1);
      await mutateAsync({ id, likeCount: localCount + 1 });
      setStoredUserLiked(true);
    } catch (cause) {
      console.error({ cause }, "Failed to update like");
    }
  };

  return (
    <div className="flex w-full justify-center">
      <button
        onClick={handleLikeCount}
        className="flex justify-center items-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill={storedUserLiked ? "red" : "none"}
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 hover:scale-125 duration-150"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
          />
        </svg>
      </button>
      <p className="m-0 ml-2 mt-1 text-xl">{String(localCount)}</p>
    </div>
  );
};
