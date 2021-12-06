import movieApi from '@/infrastructure/movieApi'
import IMovie from '@/interfaces/IMovie'
import { ActionContext, ActionTree } from 'vuex'
import { Mutations, MutationType } from './mutations'
import { State } from './state'
 
export enum ActionTypes {
  SetEditModal = 'SET_EDIT_MODAL',
  SetAddModal = 'SET_ADD_MODAL',
  DeleteMovie = 'DELETE_MOVIE'
}
type ActionAugments = Omit<ActionContext<State, State>, 'commit'> & {
    commit<K extends keyof Mutations>(
      key: K,
      payload: Parameters<Mutations[K]>[1]
    ): ReturnType<Mutations[K]>
  }
export type Actions = {
[ActionTypes.SetEditModal](context: ActionAugments, movie: IMovie): void
[ActionTypes.SetAddModal](context: ActionAugments, movie: IMovie): void
[ActionTypes.DeleteMovie](context: ActionAugments, movieName: string): void
}
export const actions: ActionTree<State, State> & Actions = {
    async [ActionTypes.SetEditModal]({ commit }, movie) {
        commit(MutationType.SetLoading, true);
        const result = await movieApi.setMovie(movie);
        // TODO: handle error (do not close modal and save movie, instead set error message)
        commit(MutationType.SetLoading, false);
        commit(MutationType.EditMovie, movie);
    },
    async [ActionTypes.SetAddModal]({ commit }, movie) {
        commit(MutationType.SetLoading, true);
        const result = await movieApi.addMovie(movie);
        // TODO: handle error (do not close modal and save movie, instead set error message)
        commit(MutationType.SetLoading, false);
        commit(MutationType.AddMovie, movie);
    },
    async [ActionTypes.DeleteMovie]({ commit }, movieName) {
        const result = await movieApi.deleteMovie(movieName);
        commit(MutationType.DeleteMovie, movieName);
    }
}