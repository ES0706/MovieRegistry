import IMovie from "@/interfaces/IMovie";
import { MutationTree } from "vuex";
import { State } from "./state";

export enum MutationType {
    AddMovie = 'ADD_MOVIE',
    EditMovie = 'EDIT_MOVIE',
    SetMovies = 'SET_MOVIES',
    SetLoading = "SET_LOADING",
    DeleteMovie = "DELETE_MOVIE"
}

export type Mutations = {
  [MutationType.AddMovie](state: State, movie: IMovie): void
  [MutationType.EditMovie](state: State, movie: IMovie): void
  [MutationType.SetMovies](state: State, movies: Array<IMovie>): void
  [MutationType.SetLoading](state: State, loading: boolean): void
  [MutationType.DeleteMovie](state: State, movieName: string): void
}

export const mutations: MutationTree<State> & Mutations = {
    [MutationType.AddMovie](state, movie) {
      state.movies.push(movie);
    },
    [MutationType.EditMovie](state, movie) {
      const movieIndex = state.movies.findIndex((mov) => mov.name === movie.name);
      debugger;
      if (movieIndex !== -1)
      {
        state.movies[movieIndex] = movie;
      }
    },
    [MutationType.DeleteMovie](state, movieName) {
      state.movies = state.movies.filter((val) => val.name !== movieName);
    },
    [MutationType.SetMovies](state, movies) {
      state.movies = movies;
    },
    [MutationType.SetLoading](state, loading) {
      state.isLoading = loading;
    }
  }