import { Injectable } from '@nestjs/common';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_API_KEY,
});
const openai = new OpenAIApi(configuration);

@Injectable()
export class OpenaiService {
  async create(prompt: string) {
    const openAiResponse = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt,
      max_tokens: 120,
      temperature: 0.86,
      top_p: 1,
      n: 1,
    });
    return openAiResponse.data.choices[0].text;
  }

  async createImage(prompt: string) {
    const openAiResponse = await openai.createImage({
      prompt,
      n: 1,
      size: '512x512',
    });
    return openAiResponse.data.data[0].url;
  }
}
