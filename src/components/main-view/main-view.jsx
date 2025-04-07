import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { Container, Row, Col, Button } from "react-bootstrap";

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");

    const [user, setUser] = useState(storedUser ? storedUser : null);
    const [token, setToken] = useState(storedToken ? storedToken : null);
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [activeTab, setActiveTab] = useState("login");

    useEffect(() => {
        if (!token) return;

        fetch("https://murmuring-dusk-30240-f46e356bdd77.herokuapp.com/movies", {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((response) => response.json())
            .then((data) => setMovies(data))
            .catch((err) => console.error("Error fetching movies:", err));
    }, [token]);

    if (!user) {
        return (
            <div
                style={{
                    minHeight: "100vh",
                    backgroundImage: "url('https://wallpaperaccess.com/full/317501.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "30px",

                }}
            >
                <div className="text-center">
                    <div className="mb-4">
                        <Button
                            variant={activeTab === "login" ? "success" : "secondary"}
                            onClick={() => setActiveTab("login")}
                            className="me-2"
                        >
                            Login
                        </Button>
                        <Button
                            variant={activeTab === "signup" ? "success" : "secondary"}
                            onClick={() => setActiveTab("signup")}
                        >
                            Sign Up
                        </Button>
                    </div>
                    {activeTab === "login" ? (
                        <LoginView
                            onLoggedIn={(user, token) => {
                                setUser(user);
                                setToken(token);
                                localStorage.setItem("user", JSON.stringify(user));
                                localStorage.setItem("token", token);
                            }}
                        />
                    ) : (
                        <SignupView />
                    )}
                </div>
            </div>
        );
    }

    if (selectedMovie) {
        return (

            <Row className="justify-content-center"> <Col md={8}>
                <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
            </Col> </Row>
        );
    }

    return (
        <>
            <div className="d-flex justify-content-end p-3">
                <Button
                    variant="outline-danger"
                    onClick={() => {
                        setUser(null);
                        setToken(null);
                        localStorage.clear();
                    }}
                >
                    Logout
                </Button>
            </div>

            <Container className="py-4 px-3">
                <Row className="gx-4 gy-5">
                    {movies.map((movie) => (
                        <Col key={movie._id} xs={12} sm={6} md={4} lg={3} className="mb-4 px-3" >
                            <MovieCard movie={movie} onMovieClick={setSelectedMovie} />
                        </Col>
                    ))}
                </Row>
            </Container>


        </>
    );
};
