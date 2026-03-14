import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

const Home = () => {
  const navigate = useNavigate();

  return (
    <Container className="pb-5">
      <div className="d-flex flex-column align-items-center text-center mt-5">
        <h1 className="page-title">Welcome to MovieApp</h1>
        <p className="text-muted mb-4" style={{ maxWidth: 650 }}>
          Browse and save your favorite titles from The Movie Database. Use the
          navigation above to explore popular movies, save ones you like, and
          view details for each title.
        </p>
        <Button variant="primary" size="lg" onClick={() => navigate("/movies")}>
          Browse Movies
        </Button>
      </div>
    </Container>
  );
};

export default Home;
