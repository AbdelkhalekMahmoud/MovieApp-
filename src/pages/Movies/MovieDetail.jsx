import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import AxiosIn from "../../axiosconfig/instance";

const MoviesDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);

    AxiosIn.get(`movie/${id}?api_key=83bf4c4ed5fcffe946729d0a15c01d3b`, {
      signal: controller.signal,
    })
      .then((res) => {
        setMovie(res.data);
      })
      .catch((err) => {
        if (err.name !== "CanceledError") console.error(err);
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [id]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center py-5">
        <span className="text-muted">Loading movie details…</span>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="d-flex justify-content-center align-items-center py-5">
        <span className="text-muted">Movie not found.</span>
      </div>
    );
  }

  const poster = movie.backdrop_path || movie.poster_path;

  return (
    <Container className="pb-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="page-title m-0">{movie.original_title}</h1>
        <Button variant="secondary" onClick={() => navigate(-1)}>
          Back
        </Button>
      </div>

      <div className="d-flex flex-column flex-md-row gap-4">
        <Card
          className="card-custom flex-shrink-0"
          style={{ width: "100%", maxWidth: 440 }}
        >
          <Card.Img
            variant="top"
            className="detail-img"
            src={
              poster
                ? `https://image.tmdb.org/t/p/w780${poster}`
                : "https://via.placeholder.com/500x280?text=No+Image"
            }
          />
        </Card>

        <div className="flex-1">
          <Card className="card-custom p-3">
            <Card.Body>
              <Card.Text className="text-muted mb-3">
                {movie.tagline || "No tagline provided."}
              </Card.Text>
              <Card.Text className="mb-2">
                <strong>Release:</strong> {movie.release_date || "Unknown"}
              </Card.Text>
              <Card.Text className="mb-2">
                <strong>Rating:</strong> {movie.vote_average ?? "—"} / 10
              </Card.Text>
              <hr className="border-secondary" />
              <Card.Text>
                {movie.overview || "No overview available."}
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>
    </Container>
  );
};

export default MoviesDetails;
