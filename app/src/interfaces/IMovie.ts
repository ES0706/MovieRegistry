export default interface IMovie {
    name: string;
    year: number;
    runtime: number;
    categories: Array<string>;
    releaseDate: string;
    director: string;
    writer: Array<string>;
    actors: Array<string>;
    storyline: string;
}