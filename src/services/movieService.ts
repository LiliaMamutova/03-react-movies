import axios from 'axios';
import type {Movie} from "../types/movie.ts";

const BASE_URL = "https://api.themoviedb.org";
const END_POINT = "/3/search/movie";

interface MovieServiceResponse {
    results: Movie[];
}

export const fetchMovies = async (query: string): Promise<Movie[]> => {
    const {data} = await axios.get<MovieServiceResponse>(`${BASE_URL}${END_POINT}`, {
        params: {
            query,
        },
        headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
        }
    });

    return data.results;
}


