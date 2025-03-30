import PropTypes from "prop-types";


export const MovieCard = ({ movie, onMovieClick }) => {
    return (
        <div
            onClick={() => onMovieClick(movie)}
            style={{
                border: "1px solid #ccc",
                borderRadius: "10px",
                padding: "10px",
                textAlign: "center",
                cursor: "pointer",
                boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
            }}
        >
            <h3>{movie.Title}</h3>
            <img
                src={movie.ImagePath}
                alt={movie.Title}
                style={{ width: "100%", height: "auto" }}
            />
        </div>
    );
};


MovieCard.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string,
        ImagePath: PropTypes.string,
        Genre: PropTypes.object,
        Director: PropTypes.object
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
};
