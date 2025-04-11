import React, { useState, useEffect, useRef } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

export const NavigationBar = ({ user, onLoggedOut }) => {
    const [expanded, setExpanded] = useState(false);
    const navRef = useRef();
    const location = useLocation();

    const isLoginPage = location.pathname === "/login";
    const isSignupPage = location.pathname === "/signup";

    const isLoggedOutView = !user && (isLoginPage || isSignupPage);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (expanded && navRef.current && !navRef.current.contains(e.target)) {
                setExpanded(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [expanded]);

    return (
        <Navbar
            ref={navRef}
            expand="lg"
            fixed="top"
            expanded={expanded}
            onToggle={() => setExpanded(!expanded)}
            className={`px-3 ${user ? "bg-dark bg-opacity-90" : "bg-transparent"}`}
        >
            <Container fluid className="d-flex justify-content-between align-items-center">

                <Navbar.Brand as={Link} to="/">
                    <div className="logo-image" />
                </Navbar.Brand>

                {/* Hamburger Icon - only for logged-in users */}
                {user && (
                    <Navbar.Toggle className="border-0">
                        <i className="bi bi-person-circle fs-2 text-white" />
                    </Navbar.Toggle>
                )}

                <Navbar.Collapse id="navbar-nav" className="mobile-menu">
                    <Nav className="ms-auto align-items-center text-center">
                        {user ? (
                            <>
                                <Nav.Link as={Link} to="/" className="text-white" onClick={() => setExpanded(false)}>
                                    Home
                                </Nav.Link>
                                <Nav.Link as={Link} to="/profile" className="text-white" onClick={() => setExpanded(false)}>
                                    Profile
                                </Nav.Link>
                                <Nav.Link as={Link} to="/favorites" className="text-white" onClick={() => setExpanded(false)}>
                                    Favorites
                                </Nav.Link>
                                <Button
                                    variant="outline-light"
                                    className="mt-2"
                                    onClick={() => {
                                        onLoggedOut();
                                        setExpanded(false);
                                    }}
                                >
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <>
                                {isSignupPage && (
                                    <Button
                                        as={Link}
                                        to="/login"
                                        variant="danger"
                                        className="fw-semibold me-2"
                                        onClick={() => setExpanded(false)}
                                    >
                                        Login
                                    </Button>
                                )}
                                {isLoginPage && (
                                    <Button
                                        as={Link}
                                        to="/signup"
                                        variant="danger"
                                        className="fw-semibold"
                                        onClick={() => setExpanded(false)}
                                    >
                                        Sign Up
                                    </Button>
                                )}
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};
