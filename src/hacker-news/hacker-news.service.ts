import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';

@Injectable()
export class HackerNewsService {
  readonly baseUrl = 'https://hacker-news.firebaseio.com/v0';

  constructor(private readonly httpService: HttpService) {}

  getNewStories(): Promise<AxiosResponse> {
    return this.httpService.axiosRef.get(`${this.baseUrl}/newstories.json`);
  }

  getStoryById(id: number): Promise<AxiosResponse> {
    return this.httpService.axiosRef.get(`${this.baseUrl}/item/${id}.json`);
  }

  getStoriesByIds(ids: number[]): Promise<AxiosResponse[]> {
    return Promise.all(ids.map((id: number) => this.getStoryById(id)));
  }
}
