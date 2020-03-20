import mockAxios from 'axios';
import { repositoryFactory } from '@/repositories/repository.factory';
import { ApiRepository } from '@/repositories/api.repository';
import { environment } from '@/environment';

jest.mock('axios');

describe('Repository Factory', () => {

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('mocked API request to retrieve configurations', () => {
    const data = {
      data: {
        name: 'roulette',
        slots: 17,
        results: ['0', '1', '2'],
        colors: ['green', 'red', 'black'],
        positionToId: [0, 2, 1],
      }
    };

    // @ts-ignore
    mockAxios.get.mockImplementationOnce(() => Promise.resolve(data));

    const repository: ApiRepository = repositoryFactory.get('api');

    repository.getConfiguration().then(response => {
      expect(response).toBe(data.data);
    });

    expect(mockAxios.get).toHaveBeenCalledWith(
      `/configuration`, undefined,
    );

  });

  test('mocked API request to get latest game statistics', () => {
    const data = {
      data: [
        { result: 0, count: 1 },
        { result: 1, count: 0 },
        { result: 2, count: 3 },
      ]
    };

    // @ts-ignore
    mockAxios.get.mockImplementationOnce(() => Promise.resolve(data));

    const repository: ApiRepository = repositoryFactory.get('api');

    repository.getLatestGames(4).then(response => {
      expect(response).toBe(data.data);
    });

    expect(mockAxios.get).toHaveBeenCalledWith(
      `/stats?limit=4`, undefined,
    );

  });

  test('mocked API request to get next game', () => {
    const data = {
      data: {
        uuid: "15fdd258-a1d7-f48e-7a08-691ac47c4b48",
        id: 1423642,
        startTime: "2020-03-19T21:41:02Z",
        startDelta: 140,
        startDeltaUs: 139796587,
        fakeStartDelta: 138,
        duration: 18,
        result: null,
        outcome: null,
      }
    };

    // @ts-ignore
    mockAxios.get.mockImplementationOnce(() => Promise.resolve(data));

    const repository: ApiRepository = repositoryFactory.get('api');

    repository.getNextGame().then(response => {
      expect(response).toBe(data.data);
    });

    expect(mockAxios.get).toHaveBeenCalledWith(
      `/nextGame`, undefined,
    );

  });

  test('mocked API request to get next game', () => {
    const data = {
      data: {
        uuid: "15fdd258-a1d7-f48e-7a08-691ac47c4b48",
        id: 1423642,
        startTime: "2020-03-19T21:41:02Z",
        startDelta: 140,
        startDeltaUs: 139796587,
        fakeStartDelta: 138,
        duration: 18,
        result: 27,
        outcome: "27",
      }
    };

    // @ts-ignore
    mockAxios.get.mockImplementationOnce(() => Promise.resolve(data));

    const repository: ApiRepository = repositoryFactory.get('api');

    repository.getGameResults(data.data.id).then(response => {
      expect(response).toBe(data.data);
    });

    expect(mockAxios.get).toHaveBeenCalledWith(
      `/game/${data.data.id}`, undefined,
    );

  });
});
