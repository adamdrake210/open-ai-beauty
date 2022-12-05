import React from "react";

export type PoemParametersType = {
  poemStyle: string;
  poemRequest: string;
  poetInspiration: string;
};

type PoemParametersProps = {
  params: PoemParametersType;
};

export const PoemParameters = ({ params }: PoemParametersProps) => {
  return (
    <div className="mb-4 md:my-8 px-8 md:px-2">
      <h3 className="mb-2">Poem Creation Inputs</h3>
      <p>
        Below are the prompt inputs provided to the AI model in order to create
        the poem.
      </p>
      <table className="table-auto text-left text-sm">
        <tbody>
          <tr>
            <td className="font-semibold min-w-[200px]">Poem Style</td>
            <td className="italic">{params.poemStyle}</td>
          </tr>
          <tr>
            <td className="font-semibold min-w-[200px]">Request to Model</td>
            <td className="italic">{params.poemRequest}</td>
          </tr>
          <tr>
            <td className="font-semibold min-w-[200px]">Poet Inspiration</td>
            <td className="italic">{params.poetInspiration}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
