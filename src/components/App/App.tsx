import css from "./App.module.css"
import SearchBar from "../SearchBar/SearchBar.tsx";
import toast, {Toaster} from "react-hot-toast";
import type {Movie} from "../../types/movie.ts";
import {fetchMovies} from "../../services/movieService.ts";
import MovieGrid from "../MovieGrid/MovieGrid.tsx";
import MovieModal from "../MovieModal/MovieModal.tsx";
import {useState} from "react";
import Loader from "../Loader/Loader.tsx";
import ErrorMessage from "../ErrorMessage/ErrorMessage.tsx";

export default function App() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
    const [isMovieLoading, setIsMovieLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);

    const openModal = (movie: Movie): void => {
        setSelectedMovie(movie);
    }

    const closeModal = () => {
        setSelectedMovie(null);
    }


    const handleSearch = async (query: string) => {
        try {
            setMovies([]);
            setIsMovieLoading(true);
            setIsError(false);

            const data = await fetchMovies(query);

            if (data.length === 0) {
                toast.error("No movies found for your request");
                return;
            }

            setMovies(data);

        } catch (error) {
            setIsError(true);
            console.error(error);

        } finally {
            setIsMovieLoading(false);
        }
    }

    return (
        <div className={css.app}>
            <SearchBar onSubmit={handleSearch}/>
            <Toaster position="top-center"/>

            {isMovieLoading && <Loader/>}
            {isError && <ErrorMessage/>}

            {!isError && !isMovieLoading && movies.length > 0 && (<MovieGrid movies={movies} onSelect={openModal}/>)}

            {selectedMovie && (<MovieModal movie={selectedMovie} onClose={closeModal}/>)}
        </div>
    );
}


