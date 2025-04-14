import React from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

export const FavoriteMoviesView = ({ user, movies, onToggleFavorite }) => {
    const navigate = useNavigate();

    const favoriteMovies = movies.filter((m) =>
        user.FavoriteMovies.includes(m._id)
    );

    return (
        <div className="p-4 text-dark mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4 mt-4">
                <h3 className="mt-4">Your Favorite Movies</h3>
                <Button variant="outline-dark" size="sm" onClick={() => navigate("/")}>
                    Movies
                </Button>
            </div>

            <Row>
                {favoriteMovies.length === 0 ? (
                    <p>No favorite movies yet.</p>
                ) : (
                    favoriteMovies.map((movie) => (
                        <Col key={movie._id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                            <Card className="h-100">
                                <Card.Img
                                    variant="top"
                                    src={movie.ImagePath}
                                    style={{ height: "300px", objectFit: "cover" }}
                                />
                                <Card.Body>
                                    <Card.Title>{movie.Title}</Card.Title>
                                    <Button
                                        variant="outline-danger"
                                        size="sm"
                                        onClick={() => onToggleFavorite(movie._id)}
                                    >
                                        Remove
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                )}
            </Row>
        </div>
    );
};

FavoriteMoviesView.propTypes = {
    user: PropTypes.object.isRequired,
    movies: PropTypes.array.isRequired,
    onToggleFavorite: PropTypes.func.isRequired,
};
