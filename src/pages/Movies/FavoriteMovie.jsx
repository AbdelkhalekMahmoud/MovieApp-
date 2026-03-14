import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { MdDelete } from "react-icons/md";
import { removeFromFavorite } from "../../Store/slices/favorits";

const FavoriteMovie = () => {
  const favorites = useSelector((state) => state.Favorites.movie);
  const dispatch = useDispatch();

  if (!favorites.length) {
    return (
      <Container className="pb-5">
        <div className="d-flex flex-column align-items-center justify-content-center text-center mt-5">
          <h1 className="page-title">Your Favorites</h1>
          <p className="text-muted mb-4">
            You haven't saved any movies yet. Click the heart icon on a movie to
            add it here.
          </p>
          <Button variant="primary" href="/movies">
            Browse movies
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <Container fluid className="pb-5">
      <h1 className="page-title">Favorites</h1>
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {favorites.map((mo) => (
          <Col key={mo.id}>
            <Card className="card-custom h-100 text-white">
              <Card.Img
                variant="top"
                src={
                  mo.backdrop_path
                    ? `https://image.tmdb.org/t/p/w500${mo.backdrop_path}`
                    : "https://via.placeholder.com/500x280?text=No+Image"
                }
              />
              <Card.Body className="d-flex flex-column">
                <Card.Title>{mo.original_title}</Card.Title>
                <Card.Text className="text-muted" style={{ flex: 1 }}>
                  {mo.overview
                    ? `${mo.overview.slice(0, 100)}...`
                    : "No overview."}
                </Card.Text>
                <Button
                  variant="secondary"
                  className="mt-2"
                  onClick={() => dispatch(removeFromFavorite(mo.id))}
                >
                  <MdDelete className="me-2" /> Remove
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default FavoriteMovie;
