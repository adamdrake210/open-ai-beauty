import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export const openaiApi = async (prompt: string) => {
  const openAiResponse = await openai.createCompletion({
    model: "text-davinci-001",
    prompt,
    max_tokens: 45,
    temperature: 1,
    top_p: 1,
    n: 1,
  });
  return openAiResponse.data.choices[0].text;
};
