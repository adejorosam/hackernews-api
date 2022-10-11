import { Injectable } from '@nestjs/common';
import { HackerNewsService } from '../../hacker-news/services/hacker-news.service';
import { TopWords } from '../interfaces/top-words.interface';
import * as moment from 'moment';

@Injectable()
export class TopWordsService {
  constructor(private readonly hackerNewsService: HackerNewsService) {}

  public async getTopWordsInNewStories(): Promise<TopWords[]> {
    // get the ids of new stories
    const newStoriesIds = await this.hackerNewsService.getNewStories();

    // get the top words in the titles of the new 25 stories
    return this.getTopWordsInTitle(newStoriesIds.data.slice(0, 25));
  }

  public async getTopWordsInTopStories(): Promise<TopWords[]> {
    // get the ids of top stories - 500 ids are returned
    const topStoriesIds = await this.hackerNewsService.getTopStories();

    // get the top words in the titles of the top 500 stories
    return this.getTopWordsInTitle(topStoriesIds.data.slice(0, 50));
  }

  public async getTopWordsInLastWeekStories(): Promise<TopWords[]> {
    // get the ids of new stories
    const newStoriesIds = await this.hackerNewsService.getNewStories();

    // get the stories by ids
    const stories = await this.hackerNewsService.getStoriesByIds(newStoriesIds.data.slice(0, 25));

    // get the unix timestamp of the beginning and end of the last week
    const startOfLastWeek = moment().startOf('week').subtract(1, 'week').unix();
    const endOfLastWeek = moment().endOf('week').subtract(1, 'week').unix();

    // get the titles of all stories created last week
    const storiesTitles = stories
      .filter((story) => story.data.time >= startOfLastWeek && story.data.time <= endOfLastWeek)
      .map((story) => story.data.title);

    // get the most occurring words in the titles
    return this.getMostOccurringWords(storiesTitles);
  }

  public async getTopWordsInTitle(storyIds: number[]): Promise<TopWords[]> {
    // get the stories by ids
    const stories = await this.hackerNewsService.getStoriesByIds(storyIds);

    // get the titles of all stories
    const storiesTitles = stories.map((story) => story.data.title);

    // get the most occurring words in the titles
    return this.getMostOccurringWords(storiesTitles);
  }

  public getMostOccurringWords(titles: string[]): TopWords[] {
    // join all titles into one string and split it into words
    const words = titles.join(' ').split(' ');

    // count the occurrence of each word
    const wordCount = words.reduce((acc, word) => {
      acc[word] = acc[word] ? acc[word] + 1 : 1;
      return acc;
    }, {});

    // sort the words by occurrence
    const sortedWords = Object.keys(wordCount).sort((a, b) => wordCount[b] - wordCount[a]);

    // return the top 10 words
    return sortedWords.slice(0, 10).map((word) => ({
      word,
      numberOfOccurrence: wordCount[word],
    }));
  }
}
