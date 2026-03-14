import React from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Container className="pb-5">
      <div className="d-flex flex-column align-items-center justify-content-center text-center mt-5">
        <h1 className="page-title">Page Not Found</h1>
        <p className="text-muted mb-4">
          We couldn’t find the page you were looking for. Try going back to the
          movie list.
        </p>
        <Button variant="primary" onClick={() => navigate("/movies")}>
          Go to Movies
        </Button>
      </div>
    </Container>
  );
};

export default NotFound;
