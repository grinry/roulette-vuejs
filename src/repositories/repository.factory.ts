import { ApiRepository } from '@/repositories/api.repository';

const repositories: { [key: string]: any } = {
  api: new ApiRepository,
};

export const repositoryFactory = {
  get: <T = any>(repository: string) => <T>repositories[repository],
};
