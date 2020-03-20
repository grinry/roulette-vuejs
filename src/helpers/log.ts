import store from '../store';

export const log = (data: string) => {
  store.dispatch('log', data);
};
