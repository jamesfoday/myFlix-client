import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
    const [movies, setMovies] = useState([
        {
            id: 1,
            title: "Titanic",
            description: "A young couple from different social classes fall in love aboard the ill-fated RMS Titanic.",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwQlOeIost26Qv6cAAT73c9LLi0oRcXOJ6QQ5h3J1fUogSX_sD",
            genre: "Sci-Fi",
            director: "James Cameron"
        },
        {
            id: 2,
            title: "Inception",
            description: "A thief who steals corporate secrets through dreams.",
            image: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQovCe0H45fWwAtV31ajOdXRPTxSsMQgPIQ3lcZX_mAW0jXV3kH",
            genre: "Science Fiction",
            director: "Christopher Nolan"
        },
        {
            id: 3,
            title: "E.T. the Extra-Terrestrial",
            description: "A young boy befriends an extraterrestrial who is stranded on Earth and helps him return home..",
            image: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQVtCI-F-fCKN3HUPRXzIcZe2e-DC97NRjhVgkG1iw2-DBqBdJ3",
            genre: "Adventure",
            director: "Steven Spielberg"
        }
    ]);

    const [selectedMovie, setSelectedMovie] = useState(null);

    if (selectedMovie) {
        return (
            <MovieView
                movie={selectedMovie}
                onBackClick={() => setSelectedMovie(null)}
            />
        );
    }

    return (
        <div>
            {movies.map((movie) => (
                <MovieCard
                    key={movie.id}
                    movie={movie}
                    onMovieClick={(movie) => setSelectedMovie(movie)}
                />
            ))}
        </div>
    );
};
