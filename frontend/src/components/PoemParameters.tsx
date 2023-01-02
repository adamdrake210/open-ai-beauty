import { Box, Text, Title } from "@mantine/core";
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
    <Box px={16} my={24}>
      <Title order={3} mb={16}>
        Poem Creation Inputs
      </Title>
      <Text size="lg">
        Below are the prompt inputs provided to the AI model in order to create
        the poem.
      </Text>
      <table>
        <tbody>
          <tr>
            <td style={{ fontWeight: 500, width: 150 }}>Poem Style</td>
            <td style={{ fontStyle: "italic" }}>{poemStyle}</td>
          </tr>
          <tr>
            <td style={{ fontWeight: 500, width: 150 }}>Request to Model</td>
            <td style={{ fontStyle: "italic" }}>{poemRequest}</td>
          </tr>
          <tr>
            <td style={{ fontWeight: 500, width: 150 }}>Poet Inspiration</td>
            <td style={{ fontStyle: "italic" }}>{poetInspiration}</td>
          </tr>
        </tbody>
      </table>
    </Box>
  );
};
