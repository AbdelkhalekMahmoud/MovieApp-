import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToFavorit, removeFromFavorite } from "../../Store/slices/favorits";
import AxiosIn from "../../axiosconfig/instance";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const favoritesMovies = useSelector((state) => state.Favorites.movie);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();

    const url = query
      ? `search/movie?api_key=83bf4c4ed5fcffe946729d0a15c01d3b&page=${page}&query=${encodeURIComponent(
          query,
        )}`
      : `movie/popular?api_key=83bf4c4ed5fcffe946729d0a15c01d3b&page=${page}`;

    AxiosIn.get(url, { signal: controller.signal })
      .then((res) => {
        setMovies(res.data.results);
      })
      .catch((err) => {
        if (err.name !== "CanceledError") console.error(err);
      });

    return () => controller.abort();
  }, [page, query]);

  const isFavorited = (id) => favoritesMovies.some((movie) => movie.id === id);

  const toggleFavorite = (movie) => {
    if (isFavorited(movie.id)) {
      dispatch(removeFromFavorite(movie.id));
    } else {
      dispatch(addToFavorit(movie));
    }
  };

  const renderOverview = (text) => {
    if (!text) return "No description available.";
    return text.length > 110 ? `${text.slice(0, 110)}...` : text;
  };

  const hasQuery = Boolean(query.trim());

  return (
    <Container fluid className="pb-5">
      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center mb-4 gap-3">
        <div className="d-flex flex-column flex-sm-row gap-3 align-items-start align-items-sm-center">
          <h1 className="page-title m-0">
            {hasQuery ? "Search results" : "Popular Movies"}
          </h1>
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            placeholder="Search movies..."
            className="form-control"
            style={{ maxWidth: 320 }}
          />
        </div>

        <div className="d-flex gap-2">
          <Button
            variant="secondary"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page <= 1}
          >
            Prev
          </Button>
          <Button variant="primary" onClick={() => setPage((p) => p + 1)}>
            Next
          </Button>
        </div>
      </div>

      {movies.length === 0 ? (
        <div className="d-flex justify-content-center align-items-center py-5">
          <span className="text-muted">
            {hasQuery
              ? `No movies found for "${query.trim()}".`
              : "No movies available right now. Please try again later."}
          </span>
        </div>
      ) : (
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {movies.map((mo) => {
            const poster = mo.backdrop_path || mo.poster_path;
            return (
              <Col key={mo.id}>
                <Card className="card-custom h-100 text-white">
                  <Card.Img
                    variant="top"
                    src={
                      poster
                        ? `https://image.tmdb.org/t/p/w500${poster}`
                        : "https://via.placeholder.com/500x280?text=No+Image"
                    }
                  />
                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="mb-1">
                      {mo.original_title}
                    </Card.Title>
                    <Card.Text className="text-muted mb-3" style={{ flex: 1 }}>
                      {renderOverview(mo.overview)}
                    </Card.Text>

                    <div className="d-flex justify-content-between align-items-center gap-2">
                      <Button
                        variant="primary"
                        onClick={() => navigate(`/movieD/${mo.id}`)}
                        className="me-auto"
                      >
                        Details
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() => toggleFavorite(mo)}
                        className="d-flex align-items-center gap-1"
                      >
                        {isFavorited(mo.id) ? <FaHeart /> : <CiHeart />}
                        <span>{isFavorited(mo.id) ? "Saved" : "Save"}</span>
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      )}
    </Container>
  );
};

export default Movies;
