import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";

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
        <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "auto", backgroundColor: "rgba(0, 0, 0, 0.5)", borderRadius: "10px", boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)", padding: "10px" }}
        >
            <Form
                onSubmit={handleSubmit}
                className="text-white p-3  "
                style={{ width: "320px" }}
            >
                <h2 className=" text-center">Sign up</h2>

                <Form.Group controlId="formUsername" className="px-4 mb-1" >
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        placeholder="Enter username"
                        className="custom-dark-input py-3"
                    />
                </Form.Group>

                <Form.Group controlId="formPassword" className="px-4 mb-1" >
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="Enter password"
                        className="custom-dark-input py-3"
                    />
                </Form.Group>

                <Form.Group controlId="formemail" className="px-4 mb-1" >
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="Enter email"
                        className="custom-dark-input py-3"
                    />
                </Form.Group>

                <Form.Group controlId="formdate" className="px-4 mb-3">
                    <Form.Label>Birthday</Form.Label>
                    <Form.Control
                        type="date"
                        value={birthday}
                        onChange={(e) => setBirthday(e.target.value)}
                        required
                        placeholder="D.O.B"
                        className="custom-dark-input py-3"
                    />
                </Form.Group>

                <div className="d-grid px-4">
                    <Button variant="primary" type="submit">
                        signup
                    </Button>
                </div>
                <div className="text-center mt-3">
                    <span className="text-white">Already have an account? </span>
                    <Link to="/login" className="text-warning fw-bold text-decoration-none">
                        Login
                    </Link>
                </div>
            </Form>
        </div>
    );
};

// 🎨 Styles
// const styles = {
//     // background: {
//     //     height: "100vh",
//     //     width: "100%",
//     //     // backgroundImage: `url("https://wallpaperaccess.com/full/317501.jpg")`,
//     //     backgroundSize: "cover",
//     //     backgroundPosition: "center",
//     //     display: "flex",
//     //     alignItems: "center",
//     //     justifyContent: "center"
//     // },
//     overlay: {
//         backgroundColor: "rgba(0, 0, 0, 0.5)",
//         padding: "60px",
//         borderRadius: "10px",
//         boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)"
//     },
//     form: {
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         gap: "15px"
//     },
//     title: {
//         color: "#fff",
//         fontSize: "24px",
//         marginBottom: "10px"
//     },
//     input: {
//         width: "220px",
//         padding: "10px",
//         borderRadius: "6px",
//         border: "none",
//         outline: "none"
//     },
//     button: {
//         padding: "10px 20px",
//         borderRadius: "6px",
//         border: "none",
//         backgroundColor: "#00b894",
//         color: "#fff",
//         fontWeight: "bold",
//         cursor: "pointer"
//     }
// };
