import Link from "next/link";
import React from "react";

type LinkButtonProps = {
  children: string | React.ReactNode;
  url: string;
  color: "primary" | "secondary";
  className?: string;
};

export const LinkButton = ({
  children,
  url,
  color,
  className,
}: LinkButtonProps) => {
  return (
    <Link
      href={url}
      className={`flex w-[100%] max-w-[240px] uppercase items-center rounded-md justify-center pb-3 pt-4 px-2 text-white transition delay-75 disabled:bg-gray-400 disabled:text-gray-200 ${
        color === "primary"
          ? "bg-purple-500 hover:bg-purple-700"
          : "bg-blue-300 hover:bg-blue-400"
      } ${className || ""}`}
    >
      {children}
    </Link>
  );
};
