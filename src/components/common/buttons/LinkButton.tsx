import Link from "next/link";
import React from "react";

type LinkButtonProps = {
  children: string | React.ReactNode;
  url: string;
  color: "primary" | "secondary";
};

export const LinkButton = ({ children, url, color }: LinkButtonProps) => {
  return (
    <Link
      href={url}
      className={`flex w-[100%] max-w-[240px] uppercase items-center rounded-md justify-center pb-3 pt-4 px-2 text-white transition delay-75 disabled:bg-gray-400 disabled:text-gray-200 ${
        color === "primary"
          ? "bg-purple-500 hover:bg-purple-700"
          : "bg-blue-300 hover:bg-blue-400"
      }`}
    >
      {children}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="ml-2 h-5 w-5 mb-1"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M14 5l7 7m0 0l-7 7m7-7H3"
        />
      </svg>
    </Link>
  );
};
