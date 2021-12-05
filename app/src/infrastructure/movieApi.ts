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
}
export default new MovieApi();