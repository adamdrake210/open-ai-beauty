import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export const openaiTextResponseApi = async (prompt: string) => {
  const openAiResponse = await openai.createCompletion({
    model: "text-davinci-001",
    prompt,
    max_tokens: 80,
    temperature: 1,
    top_p: 1,
    n: 1,
  });
  return openAiResponse.data.choices[0].text;
};

export const openaiImageResponseApi = async (prompt: string) => {
  const openAiResponse = await openai.createImage({
    prompt,
    n: 1,
    size: "512x512",
  });
  return openAiResponse.data.data[0].url;
};
