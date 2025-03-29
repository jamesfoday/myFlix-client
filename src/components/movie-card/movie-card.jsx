export const MovieCard = ({ movie, onMovieClick }) => {
    return (
        <div
            onClick={() => onMovieClick(movie)}
            style={{
                border: "1px solid #ccc",
                padding: "1rem",
                margin: "1rem",
                cursor: "pointer",
                width: "300px"
            }}
        >
            <h3>{movie.title}</h3>
        </div>
    );
};
