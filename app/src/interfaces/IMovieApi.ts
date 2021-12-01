import IMovie from "./IMovie";

export default interface IMovieApi {
    getMovies(): Promise<Array<IMovie>>;
}