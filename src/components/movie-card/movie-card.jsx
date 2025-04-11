import React from "react";
import PropTypes from "prop-types";
import { Card, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie, onToggleFavorite, isFavorite }) => {
    const handleFavoriteClick = (e) => {
        e.preventDefault(); // Prevent card/link click
        onToggleFavorite(movie._id);
    };

    return (
        <Card className="shadow-sm border-0 h-100 w-100 position-relative" style={{ cursor: "pointer" }}>
            <Link to={`/movies/${movie._id}`} style={{ textDecoration: "none" }}>
                <Card.Img
                    variant="top"
                    src={movie.ImagePath}
                    alt={movie.Title}
                    className="img-fluid"
                    style={{ height: "350px", objectFit: "cover" }}
                />
            </Link>

            <Card.Body className="d-flex flex-column p-3">
                <Card.Title className="fw-bold text-dark">{movie.Title}</Card.Title>
                <Card.Text className="text-muted mb-2">
                    Directed by: {movie.Director?.Name || "Unknown"}
                </Card.Text>

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
    }).isRequired,
    onToggleFavorite: PropTypes.func.isRequired,
    isFavorite: PropTypes.bool.isRequired,
};
