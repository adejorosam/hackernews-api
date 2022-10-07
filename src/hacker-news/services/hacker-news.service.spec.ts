import { HttpModule } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { HackerNewsService } from './hacker-news.service';
import { AxiosResponse } from 'axios';

describe('HackerNewsService', () => {
  // Create a mock data for the axios response
  const mockedStoryIds: number[] = [1234, 5678];

  const mockedStory: any = {
    by: 'test',
    descendants: 0,
    id: 1234,
    kids: [1234, 5678],
    score: 111,
    time: 1175714200,
    title: 'My YC app: Dropbox - Throw away your USB drive',
    type: 'story',
    url: 'http://www.example.com',
  };

  let mockedAxiosResponse: AxiosResponse = {
    data: mockedStoryIds,
    status: 200,
    statusText: 'OK',
    headers: {},
    config: {},
  };

  let service: HackerNewsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [HackerNewsService],
    }).compile();

    service = await module.resolve<HackerNewsService>(HackerNewsService);
  });

  describe('getNewStories', () => {
    it('can get the list of new stories', async () => {
      jest.spyOn(service, 'getNewStories').mockImplementation(() => Promise.resolve(mockedAxiosResponse));

      expect(await service.getNewStories()).toEqual(mockedAxiosResponse);
    });
  });

  describe('getTopStories', () => {
    it('can get the list of top stories', async () => {
      jest.spyOn(service, 'getTopStories').mockImplementation(() => Promise.resolve(mockedAxiosResponse));

      expect(await service.getTopStories()).toEqual(mockedAxiosResponse);
    });
  });

  describe('getStoryById', () => {
    it('can a story details by id', async () => {
      mockedAxiosResponse = { ...mockedAxiosResponse, data: mockedStory };

      jest.spyOn(service, 'getStoryById').mockImplementation(() => Promise.resolve(mockedAxiosResponse));

      expect(await service.getStoryById(8863)).toEqual(mockedAxiosResponse);
    });

    describe('getStoriesByIds', () => {
      it('can a story details by ids', async () => {
        const mockedAxiosResponses: AxiosResponse[] = [
          { ...mockedAxiosResponse, data: mockedStory },
          { ...mockedAxiosResponse, data: mockedStory },
        ];

        jest.spyOn(service, 'getStoriesByIds').mockImplementation(() => Promise.resolve(mockedAxiosResponses));

        expect(await service.getStoriesByIds([1234, 5678])).toEqual(mockedAxiosResponses);
      });
    });
  });
});
