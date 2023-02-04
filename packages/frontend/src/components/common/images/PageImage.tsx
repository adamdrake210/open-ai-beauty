import React from "react";
import { Center, Image } from "@mantine/core";

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
        fit="cover"
        radius="md"
        maw={500}
        mah={500}
      />
    </Center>
  );
};
