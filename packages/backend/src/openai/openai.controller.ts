import { Controller, Post, Body } from '@nestjs/common';
import { OpenaiService } from './openai.service';

@Controller('openai')
export class OpenaiController {
  constructor(private readonly openaiService: OpenaiService) {}

  @Post()
  create(@Body() { prompt }: { prompt: string }) {
    return this.openaiService.create(prompt);
  }
}
