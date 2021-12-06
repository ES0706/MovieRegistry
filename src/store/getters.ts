import IMovie from '@/interfaces/IMovie'
import { GetterTree } from 'vuex'
import { State } from './state'

export type Getters = {
  totalMovieCount(state: State): number
  getMovieByName(state: State): (name: string) => IMovie | undefined
}
 
export const getters: GetterTree<State, State> & Getters = {
    totalMovieCount(state) {
    return state.movies.length;
  },
  getMovieByName: (state) => (name: string) => {
    return state.movies.find((movie) => movie.name === name);
  }
}