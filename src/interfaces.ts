export type RouletteTableItemColor = 'green' | 'red' | 'black';
export type Nullable<T> = T | null;

export interface RouletteTableItem {
  value: number;
  color: RouletteTableItemColor;
}

export interface APIConfigurationResponse {
  name: string;
  slots: number;
  results: Array<string>;
  colors: Array<RouletteTableItemColor>;
  positionToId: Array<number>;
}

export interface APINextGameResponse {
  uuid: string;
  id: number;
  startTime: Date;
  startDelta: number;
  startDeltaUs: number;
  fakeStartDelta: number;
  duration: number;
  result: Nullable<number>;
  outcome: Nullable<string>;
}

export type APIStatsResponse = Array<APIStatsItem>;

export interface APIStatsItem {
  result: number;
  count: number;
}

export interface GameHistoryItem {
  game: number;
  result: number;
}
