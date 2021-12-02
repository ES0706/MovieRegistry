import movieApi from "@/infrastructure/movieApi";
import IMovie from "@/interfaces/IMovie";
import { ref } from "@vue/reactivity";
import { onMounted, onBeforeMount } from "@vue/runtime-core";

export default function useMovieRepositories() {
    const movies = ref<Array<IMovie>>([]);
    const getMovies = async () => {
        movies.value = await movieApi.getMovies();
    }

    onBeforeMount(getMovies);
    return {
        movies,
        getMovies
    }
}