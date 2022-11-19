import React from "react";

import { GithubLogo } from "assets/icons/GithubLogo";
import { TwitterLogo } from "assets/icons/TwitterLogo";
import { LinkedInLogo } from "assets/icons/LinkedInLogo";

export const SocialLinks = () => {
  return (
    <div className="flex flex-col">
      <div className="flex mt-8 mx-auto w-[70%] justify-evenly p-4">
        <a
          href="https://www.linkedin.com/in/adam-drake-ab065417/"
          target="_blank"
          rel="noreferrer"
        >
          <svg
            viewBox="0 0 28 28"
            width="60px"
            height="60px"
            className="mx-4 hover:-translate-y-1 hover:scale-110 duration-150"
          >
            <LinkedInLogo fill="rgb(75, 85, 99)" />
          </svg>
        </a>
        <a
          href="https://github.com/adamdrake210"
          target="_blank"
          rel="noreferrer"
        >
          <svg
            viewBox="0 0 65 65"
            width={50}
            height={50}
            className="mx-4 hover:-translate-y-1 hover:scale-110 duration-150"
          >
            <GithubLogo fill="rgb(75, 85, 99)" />
          </svg>
        </a>
        <a
          href="https://twitter.com/FrontEndDrake"
          target="_blank"
          rel="noreferrer"
        >
          <svg
            viewBox="0 0 24 24"
            width={50}
            height={50}
            className="mx-4 hover:-translate-y-1 hover:scale-110 duration-150"
          >
            <TwitterLogo fill="rgb(75, 85, 99)" />
          </svg>
        </a>
      </div>
      <div className="w-full flex justify-center p-4">
        <p className="text-xs">
          Developed with curiosity by{" "}
          <a
            href="https://www.adamdrake.dev/"
            className="underline"
            target="_blank"
            rel="noreferrer"
          >
            Adam Drake
          </a>
        </p>
      </div>
    </div>
  );
};
