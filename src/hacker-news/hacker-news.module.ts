import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { HackerNewsService } from './hacker-news.service';

@Module({
  imports: [HttpModule],
  providers: [HackerNewsService],
  exports: [HackerNewsService],
})
export class HackerNewsModule {}
