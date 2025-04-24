import React from "react";
import PropTypes from "prop-types";
import { Card, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom"; // Corrected duplicate import

export const MovieCard = ({ movie, onToggleFavorite, isFavorite }) => {
    const navigate = useNavigate(); // Added to enable navigation functionality

    const handleFavoriteClick = (e) => {
        e.preventDefault(); // Prevent card/link click
        onToggleFavorite(movie._id);
    };

    const handleWatchClick = (e) => {
        e.preventDefault(); // Prevent card/link click
        navigate(`/movies/${movie._id}`); // Navigate to the movie's detail page
    };

    return (
        <Card
            className="shadow-sm border-0 h-100 w-100 position-relative movie-card"
            style={{ cursor: "pointer" }}
        >
            <Link to={`/movies/${movie._id}`} style={{ textDecoration: "none" }}>
                <Card.Img
                    variant="top"
                    src={movie.ImagePath}
                    alt={movie.Title}
                    className="img-fluid"
                    style={{ height: "350px", objectFit: "cover" }}
                />
            </Link>

            {/* Movie Info */}
            <Card.Body className="d-flex flex-column p-3">
                <Card.Title className="fw-bold text-dark">{movie.Title}</Card.Title>
                <Card.Text className="text-muted mb-2">
                    Directed by: {movie.Director?.Name || "Unknown"}
                </Card.Text>

                {/* Hover Effects */}
                <div className="movie-card-hover-info">
                    <Card.Text className="movie-description">{movie.Description}</Card.Text>

                    <Button
                        variant="outline-light"
                        className="mt-2"
                        onClick={handleWatchClick}
                    >
                        Watch movie
                    </Button>
                </div>

                {/* Heart (Favorite) Button */}
                <OverlayTrigger
                    placement="top"
                    overlay={
                        <Tooltip>
                            {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                        </Tooltip>
                    }
                >
                    <Button
                        variant="link"
                        className="p-0 position-absolute top-0 end-0 m-2"
                        onClick={handleFavoriteClick}
                    >
                        <i
                            className={`bi ${isFavorite ? "bi-heart-fill text-danger" : "bi-heart text-green text-bold"}`}
                            style={{ fontSize: "1.5rem" }}
                        ></i>
                    </Button>
                </OverlayTrigger>
            </Card.Body>
        </Card>
    );
};

MovieCard.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        ImagePath: PropTypes.string.isRequired,
        Director: PropTypes.shape({
            Name: PropTypes.string,
        }),
        _id: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired, // Movie Description
        Rating: PropTypes.number, // Movie Rating
        TrailerLink: PropTypes.string, // Trailer link (YouTube)
    }).isRequired,
    onToggleFavorite: PropTypes.func.isRequired,
    isFavorite: PropTypes.bool.isRequired,
};
