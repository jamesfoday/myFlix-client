import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

export const MainView = () => {
    // 🧠 Get saved login from localStorage on first load
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");

    const [user, setUser] = useState(storedUser ? storedUser : null);
    const [token, setToken] = useState(storedToken ? storedToken : null);
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [activeTab, setActiveTab] = useState("login"); // 'login' or 'signup'

    // 🎬 Fetch movies when token is available (after login)
    useEffect(() => {
        if (!token) return;

        fetch("https://murmuring-dusk-30240-f46e356bdd77.herokuapp.com/movies", {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((response) => response.json())
            .then((data) => {
                setMovies(data);
            })
            .catch((err) => console.error("Error fetching movies:", err));
    }, [token]);


    if (!user) {
        return (
            <div
                style={{
                    minHeight: "100vh",
                    margin: 0,
                    padding: 0,
                    backgroundImage: `url("https://wallpaperaccess.com/full/317501.jpg")`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}
            >
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    {/* Tabs */}
                    <div style={{ marginBottom: "20px" }}>
                        <button
                            onClick={() => setActiveTab("login")}
                            style={{
                                padding: "10px 20px",
                                marginRight: "10px",
                                backgroundColor: activeTab === "login" ? "#00b894" : "#ccc",
                                color: "#fff",
                                border: "none",
                                borderRadius: "6px",
                                cursor: "pointer"
                            }}
                        >
                            Login
                        </button>
                        <button
                            onClick={() => setActiveTab("signup")}
                            style={{
                                padding: "10px 20px",
                                backgroundColor: activeTab === "signup" ? "#00b894" : "#ccc",
                                color: "#fff",
                                border: "none",
                                borderRadius: "6px",
                                cursor: "pointer"
                            }}
                        >
                            Sign Up
                        </button>
                    </div>

                    {/* Login or Signup view */}
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




    // 🎥 Show MovieView if a movie is selected
    if (selectedMovie) {
        return (
            <MovieView
                movie={selectedMovie}
                onBackClick={() => setSelectedMovie(null)}
            />
        );
    }

    // 🎞️ Main view - grid of movies
    return (
        <>
            <button
                onClick={() => {
                    setUser(null);
                    setToken(null);
                    localStorage.clear(); //  
                }}
                style={{ margin: "20px" }}
            >
                Logout
            </button>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                    gap: "10px",
                    padding: "40px",
                    maxWidth: "1200px",
                    margin: "0 auto"
                }}
            >
                {movies.map((movie) => (
                    <MovieCard
                        key={movie._id}
                        movie={movie}
                        onMovieClick={(movie) => setSelectedMovie(movie)}
                    />
                ))}
            </div>
        </>
    );
};
