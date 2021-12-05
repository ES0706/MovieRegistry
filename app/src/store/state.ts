import IMovie from "@/interfaces/IMovie";

export type State = {
  movies: Array<IMovie>,
  isLoading: boolean;
};
export const state: State = {
  movies: [],
  isLoading: false
};