import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { Container, Row, Col } from "react-bootstrap";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";
import { FavoriteMoviesView } from "../favorite-movies-view/favorite-movies-view";

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");

    const [user, setUser] = useState(storedUser || null);
    const [token, setToken] = useState(storedToken || null);
    const [movies, setMovies] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        if (!token) return;

        fetch("https://murmuring-dusk-30240-f46e356bdd77.herokuapp.com/movies", {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((res) => res.json())
            .then((data) => setMovies(data))
            .catch((err) => console.error("Error fetching movies:", err));
    }, [token]);

    const handleLogout = () => {
        setUser(null);
        setToken(null);
        localStorage.clear();
        navigate("/login");
    };

    const handleToggleFavorite = (movieId) => {
        const isFavorite = user.FavoriteMovies.includes(movieId);
        const method = isFavorite ? "DELETE" : "POST";

        const url = isFavorite
            ? `https://murmuring-dusk-30240-f46e356bdd77.herokuapp.com/users/${user._id}/favorites/${movieId}`
            : `https://murmuring-dusk-30240-f46e356bdd77.herokuapp.com/users/${user._id}/favorites`;

        fetch(url, {
            method,
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: method === "POST" ? JSON.stringify({ movieId }) : null,
        })
            .then((res) => {
                if (!res.ok) throw new Error("Request failed");
                return res.json();
            })
            .then((updatedUser) => {
                localStorage.setItem("user", JSON.stringify(updatedUser));
                setUser(updatedUser);
            })
            .catch((err) => console.error("Favorite toggle failed:", err));
    };

    if (!user) {
        return (
            <div className="bodylog d-flex align-items-center justify-content-center p-4 text-white">
                <NavigationBar user={null} onLoggedOut={handleLogout} isGuest={true} />
                <Routes>
                    <Route
                        path="/login"
                        element={
                            <LoginView
                                onLoggedIn={(user, token) => {
                                    setUser(user);
                                    setToken(token);
                                    localStorage.setItem("user", JSON.stringify(user));
                                    localStorage.setItem("token", token);
                                    navigate("/");
                                }}
                            />
                        }
                    />
                    <Route path="/signup" element={<SignupView />} />
                    <Route path="*" element={<Navigate to="/login" replace />} />
                </Routes>
            </div>
        );
    }

    return (
        <Container fluid className="p-0">
            <NavigationBar user={user} onLoggedOut={handleLogout} isGuest={false} />
            <Routes>
                <Route
                    path="/"
                    element={
                        <Row className="gx-4 gy-4 px-4 py-4 mx-0 mt-5 justify-content-center">
                            {movies.map((movie) => (
                                <Col
                                    key={movie._id}
                                    xs={12}
                                    sm={6}
                                    md={4}
                                    lg={3}
                                    className="d-flex justify-content-center"
                                >
                                    <MovieCard
                                        movie={movie}
                                        onMovieClick={(m) => navigate(`/movies/${m._id}`)}
                                        onToggleFavorite={handleToggleFavorite}
                                        isFavorite={user.FavoriteMovies.includes(movie._id)}
                                    />
                                </Col>
                            ))}
                        </Row>
                    }
                />
                <Route
                    path="/movies/:movieId"
                    element={
                        <MovieView
                            movies={movies}
                            onBackClick={() => navigate("/")}
                        />
                    }
                />
                <Route
                    path="/profile"
                    element={<ProfileView user={user} movies={movies} />}
                />
                <Route
                    path="/favorites"
                    element={
                        <FavoriteMoviesView
                            user={user}
                            movies={movies}
                            onToggleFavorite={handleToggleFavorite}
                        />
                    }
                />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Container>
    );
};
