import React from "react";

type PoemParametersProps = {
  poemStyle: string;
  poemRequest: string;
  poetInspiration: string;
};

export const PoemParameters = ({
  poemStyle,
  poemRequest,
  poetInspiration,
}: PoemParametersProps) => {
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
            <td className="italic">{poemStyle}</td>
          </tr>
          <tr>
            <td className="font-semibold min-w-[200px]">Request to Model</td>
            <td className="italic">{poemRequest}</td>
          </tr>
          <tr>
            <td className="font-semibold min-w-[200px]">Poet Inspiration</td>
            <td className="italic">{poetInspiration}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
