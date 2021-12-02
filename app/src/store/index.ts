import { CommitOptions, createLogger, createStore, Store as VuexStore } from "vuex";
import { State, state } from "./state";
import { Mutations, mutations } from "./mutations";
import { Getters, getters } from "./getters";

export const store = createStore<State>({
  state,
  mutations,
  getters,
  actions: {},
  modules: {},
  plugins: process.env.NODE_ENV === 'development' ? [createLogger()] : []
});
export type Store = Omit<
  VuexStore<State>,
  'getters' | 'commit' | 'dispatch'
> & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<Mutations[K]>
} & {
  getters: {
    [K in keyof Getters]: ReturnType<Getters[K]>
  }
}
export function useStore() {
  return store as Store;
}
