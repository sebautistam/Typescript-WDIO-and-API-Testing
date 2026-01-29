import got, { type OptionsOfJSONResponseBody } from 'got';
import { BASE_URL } from '../environment/environment.js';

abstract class BaseClient {
  protected baseUrl: string = BASE_URL;

  protected async get<T>(endpoint: string, options?: OptionsOfJSONResponseBody): Promise<T> {
    const res = await got.get(`${this.baseUrl}${endpoint}`, {
      ...options,
      responseType: 'json',
    });

    return res.body as T;
  }
}

export default BaseClient;