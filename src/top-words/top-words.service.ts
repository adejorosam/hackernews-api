import { Injectable } from '@nestjs/common';
import { HackerNewsService } from '../hacker-news/hacker-news.service';
import { TopWords } from './top-words.interface';

@Injectable()
export class TopWordsService {
  constructor(private readonly hackerNewsService: HackerNewsService) {}

  public async getTopWordsInNewStories(): Promise<TopWords[]> {
    // get the ids of new stories
    const newStoriesIds = await this.hackerNewsService.getNewStories();

    // get the top words in the titles of the new 25 stories
    return this.getTopWordsInTitle(newStoriesIds.data.slice(0, 25));
  }

  public async getTopWordsInTitle(storyIds: number[]): Promise<TopWords[]> {
    // get the stories by ids
    const topStories = await this.hackerNewsService.getStoriesByIds(storyIds);

    // get the titles of all stories
    const topStoriesTitles = topStories.map((story) => story.data.title);

    // get the most occuring words in the titles
    const topWords = this.getMostOccuringWords(topStoriesTitles);

    return topWords;
  }

  public getMostOccuringWords(arr: string[]): TopWords[] {
    // get all words from all titles
    const words = arr.join(' ').split(' ');

    // count the occurence of each word
    const wordCount = words.reduce((acc, word) => {
      acc[word] = acc[word] ? acc[word] + 1 : 1;
      return acc;
    }, {});

    // sort the words by occurence
    const sortedWords = Object.keys(wordCount).sort((a, b) => wordCount[b] - wordCount[a]);

    // return the top 10 words
    return sortedWords.slice(0, 10).map((word) => ({
      word,
      numberOfOccurence: wordCount[word],
    }));
  }
}
