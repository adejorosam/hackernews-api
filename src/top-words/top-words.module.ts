import { CacheModule, Module } from '@nestjs/common';
import { TopWordsService } from './top-words.service';
import { TopWordsController } from './top-words.controller';
import { HackerNewsModule } from 'src/hacker-news/hacker-news.module';

@Module({
  imports: [
    HackerNewsModule,
    CacheModule.register({
      ttl: 60, // cache for 60 seconds
    }),
  ],
  controllers: [TopWordsController],
  providers: [TopWordsService],
})
export class TopWordsModule {}
