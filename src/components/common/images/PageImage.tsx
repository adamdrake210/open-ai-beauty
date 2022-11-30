import Image from "next/image";
import React from "react";

type PageImageProps = {
  src: string;
  altText: string;
};

export const PageImage = ({ src, altText }: PageImageProps) => {
  return (
    <div className="my-8">
      <Image
        src={src}
        alt={altText}
        width={500}
        height={500}
        className="rounded-lg shadow-xl"
      />
    </div>
  );
};
