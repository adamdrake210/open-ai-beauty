import React from "react";
import Image from "next/image";
import { Center } from "@mantine/core";

type PageImageProps = {
  src: string;
  altText: string;
};

export const PageImage = ({ src, altText }: PageImageProps) => {
  return (
    <Center my={32}>
      <Image
        src={src}
        alt={altText}
        width={400}
        height={400}
        style={{ borderRadius: "3%", boxShadow: "0 0 4px #555" }}
      />
    </Center>
  );
};
