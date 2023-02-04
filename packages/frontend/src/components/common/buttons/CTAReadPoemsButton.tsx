import React from "react";
import { Button, Center } from "@mantine/core";
import Link from "next/link";

import { HOME } from "@/constants/routeConstants";

export const CTAReadPoemsButton = () => {
  return (
    <Center my={32}>
      <Link href={HOME}>
        <Button color="primary" size="md">
          Read Poetry by AI
        </Button>
      </Link>
    </Center>
  );
};
