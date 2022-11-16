import React from "react";

type LoaderProps = {
  loadingText: string;
};

export const Loader = ({ loadingText }: LoaderProps) => {
  return (
    <div className="flex flex-col justify-center items-center h-[300px]">
      <div className="flex items-center justify-center space-x-2 animate-pulse">
        <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
        <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
        <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
      </div>
      <p className="my-2 text-xl">{loadingText}</p>
    </div>
  );
};
