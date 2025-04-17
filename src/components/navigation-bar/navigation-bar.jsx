import React, { useState, useEffect, useRef } from "react";
import { Navbar, Nav, Button, Form } from "react-bootstrap";
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
            <div className="w-100 d-flex align-items-center justify-content-between">

                {/* Logo (left) */}
                <Navbar.Brand as={Link} to="/" className="me-2">
                    <div className="logo-image" />
                </Navbar.Brand>

                {/* Search bar (center on desktop, full width on mobile) */}
                {user && (
                    <div className="flex-grow-1 px-2">
                        <Form className="d-flex w-100">
                            <Form.Control
                                type="search"
                                placeholder="Search movies..."
                                className="netflix-search"
                                value={searchTerm}
                                onChange={(e) => onSearchChange(e.target.value)}
                            />
                        </Form>
                    </div>
                )}

                {/* Right-side buttons */}
                <div className="d-flex align-items-center gap-2">
                    {user ? (
                        <Navbar.Toggle className="border-0">
                            <i className="bi bi-person-circle fs-2 text-white" />
                        </Navbar.Toggle>
                    ) : (
                        <>
                            {isSignupPage && (
                                <Button
                                    as={Link}
                                    to="/login"
                                    variant="danger"
                                    className="fw-semibold"
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
            </div>

            {/* Mobile dropdown */}
            <Navbar.Collapse id="navbar-nav" className="mobile-menu mt-2">
                <Nav className="ms-auto text-center">
                    {user && (
                        <>
                            <Nav.Link as={Link} to="/" className="text-white" onClick={() => setExpanded(false)}>Home</Nav.Link>
                            <Nav.Link as={Link} to="/profile" className="text-white" onClick={() => setExpanded(false)}>Profile</Nav.Link>
                            <Nav.Link as={Link} to="/favorites" className="text-white" onClick={() => setExpanded(false)}>Favorites</Nav.Link>
                            <Button
                                variant="outline-light"
                                className="mt-1"
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
        </Navbar>
    );
};
