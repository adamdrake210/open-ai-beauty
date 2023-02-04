import React from "react";
import { Center, Loader as MantineLoader } from "@mantine/core";

type LoaderProps = {
  loadingText: string;
};

export const Loader = ({ loadingText }: LoaderProps) => {
  return (
    <Center sx={{ flexDirection: "column" }}>
      <MantineLoader color="primary" size="lg" />
      <p>{loadingText}</p>
    </Center>
  );
};
