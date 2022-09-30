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

  describe('getMostOccurringWords', () => {
    it('can get the most occurring words', () => {
      const wordsArrays = ['this is a first test', 'this is a second test', 'this is a third test'];

      const topWords = service.getMostOccurringWords(wordsArrays);

      expect(topWords).toEqual([
        { word: 'this', numberOfOccurrence: 3 },
        { word: 'is', numberOfOccurrence: 3 },
        { word: 'a', numberOfOccurrence: 3 },
        { word: 'test', numberOfOccurrence: 3 },
        { word: 'first', numberOfOccurrence: 1 },
        { word: 'second', numberOfOccurrence: 1 },
        { word: 'third', numberOfOccurrence: 1 },
      ]);
    });
  });
});
