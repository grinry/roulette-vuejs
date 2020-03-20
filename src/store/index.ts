import Vue from 'vue';
import Vuex from 'vuex';
import { APIConfigurationResponse, APINextGameResponse, GameHistoryItem } from '@/interfaces';
import { EventBus } from '@/eventBus';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    configurations: {} as APIConfigurationResponse,
    game: {} as APINextGameResponse,
    logs: [] as Array<string>,
    history: [] as Array<GameHistoryItem>,
    spinning: false,
  },
  mutations: {
    configurations(state, data: APIConfigurationResponse) {
      state.configurations = data;
    },
    log(state, data: string) {
      const date = new Date().toISOString();
      state.logs.push(`${date}  ${data}`);
    },
    game(state, data: APINextGameResponse) {
      state.game = data;
    },
    history(state, data: GameHistoryItem) {
      state.history.push(data);
    },
    spin(state, value: boolean) {
      state.spinning = value;
    },
  },
  actions: {
    configurations(context, data: APIConfigurationResponse) {
      context.commit('configurations', data);
    },
    log(context, data: string) {
      context.commit('log', data);
    },
    game(context, game: APINextGameResponse) {
      context.commit('game', game);
    },
    history(context, historyItem: GameHistoryItem) {
      context.commit('history', historyItem);
    },
    spin(contex, value: boolean) {
      contex.commit('spin', value);
    },
  },
});
