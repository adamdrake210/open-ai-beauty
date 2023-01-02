import React from "react";

import { GithubLogo } from "assets/icons/GithubLogo";
import { TwitterLogo } from "assets/icons/TwitterLogo";
import { LinkedInLogo } from "assets/icons/LinkedInLogo";
import { Anchor, Flex } from "@mantine/core";

export const SocialLinks = () => {
  return (
    <Flex direction="column" justify="center" align="center" mt={48}>
      <Flex justify="space-evenly" p={16} mx="auto" w="35%">
        <a
          href="https://www.linkedin.com/in/adam-drake-ab065417/"
          target="_blank"
          rel="noreferrer"
        >
          <svg
            viewBox="0 0 28 28"
            width="60px"
            height="60px"
            // className="mx-4 hover:-translate-y-1 hover:scale-110 duration-150"
          >
            <LinkedInLogo fill="rgb(75, 85, 99)" />
          </svg>
        </a>
        <a
          href="https://github.com/adamdrake210"
          target="_blank"
          rel="noreferrer"
        >
          <svg viewBox="0 0 65 65" width={50} height={50}>
            <GithubLogo fill="rgb(75, 85, 99)" />
          </svg>
        </a>
        <a
          href="https://twitter.com/FrontEndDrake"
          target="_blank"
          rel="noreferrer"
        >
          <svg viewBox="0 0 24 24" width={50} height={50}>
            <TwitterLogo fill="rgb(75, 85, 99)" />
          </svg>
        </a>
      </Flex>
      <div>
        <p>
          Developed with curiosity by{" "}
          <Anchor
            href="https://www.adamdrake.dev/"
            target="_blank"
            rel="noreferrer"
            sx={{ fontWeight: 500 }}
          >
            Adam Drake
          </Anchor>
        </p>
      </div>
    </Flex>
  );
};
