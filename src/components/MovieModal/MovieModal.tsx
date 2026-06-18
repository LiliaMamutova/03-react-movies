import type {Movie} from "../../types/movie.ts";
import css from "./MovieModal.module.css"
import {createPortal} from "react-dom";
import React, {useEffect} from "react";

export interface MovieModalProps {
    movie: Movie;
    onClose: () => void;

}

export default function MovieModal({movie, onClose}: MovieModalProps) {

    const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    }

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.code === "Escape") {
                onClose();
            }
        }

        window.addEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "hidden";

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "";
        }
    }, [onClose]);


    const handleClose = () => {
        onClose();
    }

    const rootModal = document.getElementById("root-modal");
    if (!rootModal) {
        return null;
    }

    return createPortal(
        <div className={css.backdrop} onClick={handleBackdropClick} role="dialog" aria-modal="true">
            <div className={css.modal}>
                <button className={css.closeButton} aria-label="Close modal" onClick={handleClose}>
                    &times;
                </button>
                <img
                    src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
                    alt={movie.title}
                    className={css.image}
                />
                <div className={css.content}>
                    <h2>{movie.title}</h2>
                    <p>{movie.overview}</p>
                    <p>
                        <strong>Release Date: </strong>{movie.release_date}
                    </p>
                    <p>
                        <strong>Rating: </strong>{movie.vote_average}/10
                    </p>
                </div>
            </div>
        </div>,
        rootModal,
    );
}