import { CacheModule, Module } from '@nestjs/common';
import { TopWordsService } from './services/top-words.service';
import { TopWordsController } from './controllers/top-words.controller';
import { HackerNewsModule } from '../hacker-news/hacker-news.module';

@Module({
  imports: [
    HackerNewsModule,
    CacheModule.register({
      ttl: 3600, // cache for 1 hour
    }),
  ],
  controllers: [TopWordsController],
  providers: [TopWordsService],
})
export class TopWordsModule {}
