import { APIConfigurationResponse, APINextGameResponse, APIStatsResponse } from '@/interfaces';
import { Repository } from '@/repositories/repository';

/**
 *
 */
export class ApiRepository {
  /**
   *
   */
  public getConfiguration() {
    return Repository.get<APIConfigurationResponse>('/configuration').then(response => response.data);
  }

  /**
   *
   * @param games
   */
  public getLatestGames(games: number = 200) {
    return Repository.get<APIStatsResponse>(`/stats?limit=${games}`).then(response => response.data);
  }

  /**
   *
   */
  public getNextGame() {
    return Repository.get<APINextGameResponse>('/nextGame').then(response => response.data);
  }

  /**
   *
   * @param gameId
   */
  public getGameResults(gameId: number) {
    return Repository.get<APINextGameResponse>(`/game/${gameId}`).then(response => response.data);
  }
}
