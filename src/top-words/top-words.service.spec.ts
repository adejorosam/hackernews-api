import { HackerNewsModule } from '../hacker-news/hacker-news.module';
import { Test, TestingModule } from '@nestjs/testing';
import { TopWordsService } from './top-words.service';

describe('TopWordsService', () => {
  let service: TopWordsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HackerNewsModule],
      providers: [TopWordsService],
    }).compile();

    service = await module.resolve<TopWordsService>(TopWordsService);
  });

  describe('getMostOccuringWords', () => {
    it('can get the most occuring words', () => {
      const wordsArrays = ['this is a first test', 'this is a second test', 'this is a third test'];

      const topWords = service.getMostOccuringWords(wordsArrays);

      expect(topWords).toEqual([
        { word: 'this', numberOfOccurence: 3 },
        { word: 'is', numberOfOccurence: 3 },
        { word: 'a', numberOfOccurence: 3 },
        { word: 'test', numberOfOccurence: 3 },
        { word: 'first', numberOfOccurence: 1 },
        { word: 'second', numberOfOccurence: 1 },
        { word: 'third', numberOfOccurence: 1 },
      ]);
    });
  });
});
