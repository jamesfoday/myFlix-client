import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";


export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
      style={{ height: "auto", backgroundColor: "rgba(0, 0, 0, 0.5)", borderRadius: "10px",  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)", padding: "10px"  }}
    >
      <Form
        onSubmit={handleSubmit}
        className="  text-white p-5 "
        style={{ width: "400px" }}
      >
        <h2 className="mb-4 text-center">FUCK ATC</h2>

        <Form.Group controlId="formUsername" className="mb-3  ">
          <Form.Label >Username</Form.Label>
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
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter password"
            className="custom-dark-input py-3"
          />
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


// // 🎨 Styles
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
    
//     // 
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
// // 
