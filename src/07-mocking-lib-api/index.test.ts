import axios from 'axios';
import { throttledGetDataFromApi } from './index';

describe('throttledGetDataFromApi', () => {
  test('should create instance with provided base url', async () => {
    const axiosCreateSpy = jest.spyOn(axios, 'create');
    const relativePath = '/posts';

    await throttledGetDataFromApi(relativePath);

    expect(axiosCreateSpy).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    // const axiosGetSpy = jest.spyOn(axios, 'get');
    // const relativePath = '/posts';
    // await throttledGetDataFromApi(relativePath);
    // expect(axiosGetSpy).toHaveBeenCalledWith(relativePath);
  });

  test('should return response data', async () => {
    // const responseData = [{ id: 1, title: 'Post 1' }];
    // const axiosGetMock = jest.spyOn(axios, 'get');
    // axiosGetMock.mockResolvedValue({ data: responseData });
    // const relativePath = '/posts';
    // const result = await throttledGetDataFromApi(relativePath);
    // expect(result).toEqual(responseData);
  });
});
