import { CacheInterceptor, Controller, Get, UseInterceptors } from '@nestjs/common';
import { TopWordsService } from '../services/top-words.service';
import { TopWords } from '../interfaces/top-words.interface';

@UseInterceptors(CacheInterceptor)
@Controller('top-words')
export class TopWordsController {
  constructor(private readonly topWordsService: TopWordsService) {}

  @Get('new-stories')
  async getTopWordsInNewStories(): Promise<TopWords[]> {
    return this.topWordsService.getTopWordsInNewStories();
  }

  @Get('top-stories')
  async getTopWordsInTopStories(): Promise<TopWords[]> {
    return this.topWordsService.getTopWordsInTopStories();
  }

  @Get('last-week-stories')
  async getTopWordsInLastWeekStories(): Promise<TopWords[]> {
    return this.topWordsService.getTopWordsInLastWeekStories();
  }
}
