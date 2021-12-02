import IMovie from "@/interfaces/IMovie";

export type State = {
  movies: Array<IMovie>
};
export const state: State = {
  movies: []
};