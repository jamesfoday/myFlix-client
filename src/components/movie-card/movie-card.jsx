// src/components/movie-card/movie-card.jsx

import React from "react";
import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";

export const MovieCard = ({ movie, onMovieClick }) => {
    return (
        <Card
            className="shadow-sm border-0 h-100 w-100" style={{ cursor: "pointer" }}
            onClick={() => onMovieClick(movie)}
        >
            <Card.Img
                variant="top"
                src={movie.ImagePath}
                alt={movie.Title}
                className="img-fluid"
                style={{ height: "350px", objectFit: "cover" }}
            />
            <Card.Body className="d-flex flex-column p-3">
                <Card.Title className="fw-bold">{movie.Title}</Card.Title>
                <Card.Text className="text-muted mb-2">
                    Directed by: {movie.Director?.Name || "Unknown"}
                </Card.Text>
                <Button variant="primary" onClick={() => onMovieClick(movie)}>
                    View Details
                </Button>
            </Card.Body>
        </Card>
    );
};

// 🧠 Type check
MovieCard.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        ImagePath: PropTypes.string.isRequired,
        Director: PropTypes.shape({
            Name: PropTypes.string
        }),
        _id: PropTypes.string
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
};
