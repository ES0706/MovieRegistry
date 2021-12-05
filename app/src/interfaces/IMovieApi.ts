import IMovie from "./IMovie";

export default interface IMovieApi {
    getMovies(): Promise<Array<IMovie>>;
    setMovie(movie: IMovie): Promise<boolean>;
    addMovie(movie: IMovie): Promise<boolean>;
    deleteMovie(movieName: string): Promise<boolean>;
}