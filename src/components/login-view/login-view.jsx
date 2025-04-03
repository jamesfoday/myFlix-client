import React, { useState } from "react";

export const LoginView = ({ onLoggedIn }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        fetch("https://murmuring-dusk-30240-f46e356bdd77.herokuapp.com/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                Username: username,
                Password: password
            })
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Login response: ", data);
                if (data.user) {
                    localStorage.setItem("user", JSON.stringify(data.user));
                    localStorage.setItem("token", data.token);
                    onLoggedIn(data.user, data.token);
                } else {
                    alert("No such user");
                }
            })
            .catch((e) => {
                alert("Something went wrong");
            });
    };


    return (
        <div style={styles.background}>
            <div style={styles.overlay}>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <h2 style={styles.title}>Welcome to myFlix</h2>

                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        style={styles.input}
                        required
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={styles.input}
                        required
                    />

                    <button type="submit" style={styles.button}>
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

// 🎨 Styles
const styles = {
    // background: {
    //     height: "100vh",
    //     width: "100%",
    //     // backgroundImage: `url("https://wallpaperaccess.com/full/317501.jpg")`, 
    //     backgroundSize: "cover",
    //     backgroundPosition: "center",
    //     display: "flex",
    //     alignItems: "center",
    //     justifyContent: "center"
    // },
    overlay: {
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        padding: "60px",
        borderRadius: "10px",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)"
    },
    form: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "15px"
    },
    title: {
        color: "#fff",
        fontSize: "24px",
        marginBottom: "10px"
    },
    input: {
        width: "220px",
        padding: "10px",
        borderRadius: "6px",
        border: "none",
        outline: "none"
    },
    button: {
        padding: "10px 20px",
        borderRadius: "6px",
        border: "none",
        backgroundColor: "#00b894",
        color: "#fff",
        fontWeight: "bold",
        cursor: "pointer"
    }
};
