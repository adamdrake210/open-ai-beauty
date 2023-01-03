import React from "react";
import { Center, Loader as MantineLoader } from "@mantine/core";

type LoaderProps = {
  loadingText: string;
};

export const Loader = ({ loadingText }: LoaderProps) => {
  return (
    <Center>
      <MantineLoader color="indigo" size="lg" />
      <p>{loadingText}</p>
    </Center>
  );
};
