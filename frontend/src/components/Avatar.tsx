import React from "react";
import Image from "next/image";

type AvatarProps = {
  picUrl: string;
};

export const Avatar = ({ picUrl }: AvatarProps) => {
  return (
    <Image
      className="w-10 h-10 rounded-full"
      src={picUrl}
      alt="Rounded avatar"
      width={40}
      height={40}
    />
  );
};
