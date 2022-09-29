import { CacheInterceptor, Controller, Get, UseInterceptors } from '@nestjs/common';
import { TopWordsService } from './top-words.service';
import { TopWords } from './top-words.interface';

@UseInterceptors(CacheInterceptor)
@Controller('top-words')
export class TopWordsController {
  constructor(private readonly topWordsService: TopWordsService) {}

  @Get('new-stories')
  async getTopWordsInNewStories(): Promise<TopWords[]> {
    return this.topWordsService.getTopWordsInNewStories();
  }
}
