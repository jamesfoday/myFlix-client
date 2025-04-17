import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { BsEye, BsEyeSlash } from "react-icons/bs";

export const SignupView = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsSubmitting(true);

        const data = {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday
        };

        fetch("https://murmuring-dusk-30240-f46e356bdd77.herokuapp.com/users", {
            method: "POST",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" }
        })
            .then((response) => {
                setIsSubmitting(false);
                if (response.ok) {
                    alert("Signup successful! You can now log in.");
                    navigate("/login");
                } else {
                    return response.json().then(err => {
                        const msg = err.errors?.[0]?.msg || "Signup failed. Please try again.";
                        alert(msg);
                    });
                }
            })
            .catch(() => {
                setIsSubmitting(false);
                alert("Something went wrong. Please try again later.");
            });
    };

    return (
        <div
            className="d-flex justify-content-center align-items-center"
            style={{
                minHeight: "100vh",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                borderRadius: "10px",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
                padding: "10px"
            }}
        >
            <Form onSubmit={handleSubmit} className="text-white p-3" style={{ width: "320px" }}>
                <h2 className="text-center mb-3">Sign up</h2>

                <Form.Group controlId="formUsername" className="px-4 mb-2">
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

                <Form.Group controlId="formPassword" className="px-4 mb-1 position-relative">
                    <Form.Label>Password</Form.Label>
                    <div className="position-relative">
                        <Form.Control
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Enter password"
                            className="custom-dark-input py-3 pe-5"
                        />
                        <span
                            onClick={() => setShowPassword(!showPassword)}
                            style={{
                                position: "absolute",
                                right: "15px",
                                top: "50%",
                                transform: "translateY(-50%)",
                                cursor: "pointer",
                                color: "#ccc"
                            }}
                        >
                            {showPassword ? <BsEyeSlash /> : <BsEye />}
                        </span>
                    </div>
                </Form.Group>

                <Form.Group controlId="formEmail" className="px-4 mb-2">
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

                <Form.Group controlId="formBirthday" className="px-4 mb-3">
                    <Form.Label>Birthday</Form.Label>
                    <Form.Control
                        type="date"
                        value={birthday}
                        onChange={(e) => setBirthday(e.target.value)}
                        required
                        className="custom-dark-input py-3"
                    />
                </Form.Group>

                <div className="d-grid px-4">
                    <Button variant="primary" type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Signing up..." : "Sign up"}
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
