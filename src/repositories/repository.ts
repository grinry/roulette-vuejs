import { AxiosRequestConfig, AxiosResponse } from "axios";
import { HttpClient } from '@/helpers/http-client';

/**
 *
 */
export class Repository {
  /**
   *
   * @param path
   * @param config
   */
  public static get<T = any, R = AxiosResponse<T>>(
    path: string,
    config?: AxiosRequestConfig | undefined,
  ) {
    return HttpClient.get<T, R>(path, config);
  }
}
