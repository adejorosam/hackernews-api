import { CacheModule } from '@nestjs/common';
import { HackerNewsModule } from '../hacker-news/hacker-news.module';
import { TopWords } from './top-words.interface';
import { Test, TestingModule } from '@nestjs/testing';
import { TopWordsController } from './top-words.controller';
import { TopWordsService } from './top-words.service';

describe('TopWordsController', () => {
  let service: TopWordsService;
  let controller: TopWordsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HackerNewsModule, CacheModule.register({})],
      controllers: [TopWordsController],
      providers: [TopWordsService],
    }).compile();

    service = await module.resolve<TopWordsService>(TopWordsService);
    controller = await module.resolve<TopWordsController>(TopWordsController);
  });

  describe('getTopWordsInNewStories', () => {
    it('should return an array of top words', async () => {
      const result: TopWords[] = [
        {
          word: 'word',
          numberOfOccurrence: 1,
        },
      ];

      jest.spyOn(service, 'getTopWordsInNewStories').mockImplementation(() => Promise.resolve(result));

      expect(await controller.getTopWordsInNewStories()).toEqual(result);
    });
  });
});
