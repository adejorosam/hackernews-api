import { Module } from '@nestjs/common';
import { TopWordsModule } from './top-words/top-words.module';
import { HackerNewsModule } from './hacker-news/hacker-news.module';

@Module({
  imports: [TopWordsModule, HackerNewsModule],
})
export class AppModule {}
