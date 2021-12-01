import IStoreState from "@/interfaces/IStoreState";
import { createStore } from "vuex";

export default createStore<IStoreState>({
  state: {
    movieData: []
  },
  mutations: {},
  actions: {},
  modules: {},
});
