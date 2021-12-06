import IMovie from "@/interfaces/IMovie";
import IMovieApi from "@/interfaces/IMovieApi";
import axios from "axios";

const serverURI = "http://localhost:3000";
const movieURL = "movies";

class MovieApi implements IMovieApi{
    public async getMovies(): Promise<Array<IMovie>> {
        const response = await axios.get(`${serverURI}/${movieURL}`);
        const data = response.data as Array<any>;
        data.map((val) => val.releaseDate = val["release-date"]);
        return data;
    }
    public async setMovie(movie: IMovie): Promise<boolean> {
        const movieToSet = { ...movie };
        const releaseDate = movieToSet.releaseDate;
        (movieToSet as any).releaseDate = undefined;
        (movieToSet as any)["release-date"] = releaseDate;
        const response = await axios.put(`${serverURI}/${movieURL}/${movie.name}`, movieToSet);
        if (response.status === 200) {
            return true;
        } else {
            return false;
        }
    }
    public async addMovie(movie: IMovie): Promise<boolean> {
        const movieToSet = { ...movie };
        const releaseDate = movieToSet.releaseDate;
        (movieToSet as any).releaseDate = undefined;
        (movieToSet as any)["release-date"] = releaseDate;
        const response = await axios.post(`${serverURI}/${movieURL}`, movieToSet);
        if (response.status === 200) {
            return true;
        } else {
            return false;
        }
    }
    public async deleteMovie(movieName: string): Promise<boolean> {
        const response = await axios.delete(`${serverURI}/${movieURL}/${movieName}`);
        if (response.status === 200) {
            return true;
        } else {
            return false;
        }
    }
}
export default new MovieApi();