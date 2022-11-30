import React from "react";

type QuoteBlockProps = {
  quote: string;
};

export const QuoteBlock = ({ quote }: QuoteBlockProps) => {
  return (
    <div className="text-2xl italic px-8 py-4 my-12 border-l-2 border-gray-200 text-gray-400">
      {quote}
    </div>
  );
};
