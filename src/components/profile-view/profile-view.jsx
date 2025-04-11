import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Form, Row, Col } from "react-bootstrap";

export const ProfileView = ({ user, movies }) => {
    const [username, setUsername] = useState(user.Username);
    const [email, setEmail] = useState(user.Email);
    const [birthday, setBirthday] = useState(user.Birthday);
    const [password, setPassword] = useState("");
    const token = localStorage.getItem("token");

    const handleUpdate = (e) => {
        e.preventDefault();

        fetch(
            `https://murmuring-dusk-30240-f46e356bdd77.herokuapp.com/users/${user.Username}`,
            {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    Username: username,
                    Email: email,
                    Birthday: birthday,
                    Password: password,
                }),
            }
        )
            .then((res) => res.json())
            .then((data) => {
                alert("Profile updated successfully");
                localStorage.setItem("user", JSON.stringify(data));
                window.location.reload();
            })
            .catch((err) => console.error(err));
    };

    const handleDeregister = () => {
        const confirmDelete = window.confirm("Are you sure you want to delete your account?");
        if (!confirmDelete) return;

        fetch(
            `https://murmuring-dusk-30240-f46e356bdd77.herokuapp.com/users/${user._id}`,
            {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            }
        )
            .then((res) => {
                if (res.ok) {
                    alert("Account deleted successfully");
                    localStorage.clear();
                    window.location.replace("/signup");
                } else {
                    alert("Failed to delete account");
                }
            })
            .catch((err) => console.error(err));
    };

    return (
        <Row className="p-4 text-dark mt-5  justify-content-center b" >
            <Col md={6} className="border border-secondary rounded p-3 m-4">
                <h3>Edit Profile</h3>
                <Form onSubmit={handleUpdate} >
                    <Form.Group className="mb-3">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            style={{ width: "300px" }}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={{ width: "300px" }}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Birthday</Form.Label>
                        <Form.Control
                            type="date"
                            value={birthday}
                            onChange={(e) => setBirthday(e.target.value)}
                            style={{ width: "300px" }}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{ width: "300px" }}
                        />
                    </Form.Group>

                    <Button type="submit" variant="success" className="me-2">
                        Update
                    </Button>
                    <Button variant="danger" onClick={handleDeregister}>
                        Delete Account
                    </Button>
                </Form>
            </Col>
        </Row>
    );
};

ProfileView.propTypes = {
    user: PropTypes.object.isRequired,
    movies: PropTypes.array.isRequired,
};
