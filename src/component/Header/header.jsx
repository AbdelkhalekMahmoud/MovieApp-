import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Head = () => {
  const favorites = useSelector((state) => state.Favorites.movie);

  return (
    <Navbar expand="lg" variant="dark" className="navbar-custom fixed-top">
      <Container>
        <Navbar.Brand as={NavLink} to="/" className="fw-bold">
          <span className="text-primary">Movie</span>App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="ms-auto align-items-center">
            <Nav.Link as={NavLink} to="/movies" className="nav-link-custom">
              Movies
            </Nav.Link>
            <Nav.Link as={NavLink} to="/Fav" className="nav-link-custom">
              Favorites
            </Nav.Link>
            <Nav.Link as={NavLink} to="/login" className="nav-link-custom">
              Login
            </Nav.Link>
            <Nav.Link as={NavLink} to="/reg" className="nav-link-custom">
              Register
            </Nav.Link>
            <span className="badge badge-accent ms-2">
              {favorites.length} liked
            </span>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Head;
