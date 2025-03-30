import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";



export const MainView = () => {
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);

    // fetch movies
    useEffect(() => {
        fetch("https://murmuring-dusk-30240-f46e356bdd77.herokuapp.com/movies")
            .then((response) => response.json())
            .then((data) => {
                setMovies(data); // Update state with API response
            })
            .catch((error) => {
                console.error("Error fetching movies:", error);
            });
    }, []);

    // show its details
    if (selectedMovie) {
        return (
            <MovieView
                movie={selectedMovie}
                onBackClick={() => setSelectedMovie(null)}
            />
        );
    }

    //  movie list
    return (
        <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "10px", // smaller space between items
            padding: "40px", // more space around the whole container
            maxWidth: "1200px", // optional: to keep it from stretching too far
            margin: "0 auto" // center the grid horizontally
        }}>
            {movies.map((movie) => (
                <MovieCard
                    key={movie._id}
                    movie={movie}
                    onMovieClick={(movie) => setSelectedMovie(movie)}
                />
            ))}
        </div>
    );
};

