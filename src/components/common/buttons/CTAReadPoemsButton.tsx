import React from "react";
import { HOME } from "@/constants/routeConstants";
import { LinkButton } from "./LinkButton";

export const CTAReadPoemsButton = () => {
  return (
    <div className="flex justify-center my-8">
      <LinkButton url={HOME} color="primary">
        Read Poetry by AI
      </LinkButton>
    </div>
  );
};
