import React, { useState, useEffect, useRef } from "react";
import { Navbar, Nav, Container, Button, Form } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

export const NavigationBar = ({ user, onLoggedOut, searchTerm, onSearchChange }) => {
    const [expanded, setExpanded] = useState(false);
    const navRef = useRef();
    const location = useLocation();

    const isLoginPage = location.pathname === "/login";
    const isSignupPage = location.pathname === "/signup";

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
            className={`px-3 py-2 ${user ? "bg-dark bg-opacity-90" : "bg-transparent"}`}
        >
            <Container fluid className="d-flex align-items-center justify-content-between gap-2 flex-nowrap">

                {/* Logo */}
                <Navbar.Brand as={Link} to="/" className="me-2 flex-shrink-0">
                    <div className="logo-image" />
                </Navbar.Brand>

                {/* Search Bar (only for logged-in users) */}
                {user && (
                    <Form className="flex-grow-1 me-2">
                        <Form.Control
                            type="search"
                            placeholder="Search movies..."
                            className="netflix-search"
                            value={searchTerm}
                            onChange={(e) => onSearchChange(e.target.value)}
                        />
                    </Form>
                )}

                {/* Right Controls (User icon or login/signup buttons) */}
                <div className="d-flex align-items-center flex-shrink-0">
                    {user ? (
                        <Navbar.Toggle className="border-0 p-1">
                            <i className="bi bi-person-circle fs-3 text-white" />
                        </Navbar.Toggle>
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
                </div>

                {/* Mobile Dropdown Menu */}
                <Navbar.Collapse id="navbar-nav" className="mobile-menu mt-2">
                    <Nav className="ms-auto align-items-center text-center">
                        {user && (
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
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};
