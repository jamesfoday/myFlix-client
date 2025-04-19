import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { BsEye, BsEyeSlash } from "react-icons/bs";

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch("https://murmuring-dusk-30240-f46e356bdd77.herokuapp.com/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ Username: username, Password: password })
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.user) {
          onLoggedIn(data.user, data.token);
        } else {
          alert("Login failed");
        }
      })
      .catch((err) => {
        console.error("Login error:", err);
      });
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center "
      style={{ height: "auto", backgroundColor: "rgba(0, 0, 0, 0.5)", borderRadius: "10px", boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)", padding: "10px" }}
    >
      <Form
        onSubmit={handleSubmit}
        className=" text-white p-5 "
        style={{ width: "320px" }}
      >
        <h2 className="mb-4 text-center">Login</h2>

        <Form.Group controlId="formUsername" className="mb-3 ">
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

        <Form.Group controlId="formPassword" className="mb-4">
          <Form.Label>Password</Form.Label>
          <div className="input-group">
            <Form.Control
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter password"
              className="custom-dark-input py-3"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="input-group-text"
            >
              {showPassword ? <BsEyeSlash /> : <BsEye />}
            </span>
          </div>
        </Form.Group>

        <div className="d-grid">
          <Button variant="primary" type="submit">
            Login
          </Button>
        </div>
        <div className="text-center mt-3">
          <span className="text-white">New to myFlix? </span>
          <Link to="/signup" className="text-warning fw-bold text-decoration-none">
            Sign up now
          </Link>
        </div>
      </Form>
    </div>
  );
};
