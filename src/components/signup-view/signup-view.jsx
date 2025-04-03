import React, { useState } from "react";

export const SignupView = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday
        };

        fetch("https://murmuring-dusk-30240-f46e356bdd77.herokuapp.com/users", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => {
            if (response.ok) {
                alert("Signup successful");
                window.location.reload(); // reload so user can login
            } else {
                alert("Signup failed");
            }
        });
    };

    return (
        <div style={styles.background}>
            <div style={styles.overlay}>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <h2 style={styles.title}> Create an account</h2>

                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        style={styles.input}
                        required
                        minLength="3"
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={styles.input}
                        required
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={styles.input}
                        required
                    />

                    <input
                        type="date"
                        value={birthday}
                        onChange={(e) => setBirthday(e.target.value)}
                        style={styles.input}
                        required
                    />

                    <button type="submit" style={styles.button} >Sign Up</button>
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

