import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../App.css";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const moviesPerPage = 9;

  const loadMovies = async (page) => {
    setIsLoading(true);
    try {
      const apiKey = "239474ee";
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${apiKey}&s=${searchQuery}&page=${page}&type=movie`
      );
      const data = await response.json();

      if (data.Response === "True") {
        const moviesSlice = data.Search.slice(0, moviesPerPage);
        setMovies(moviesSlice);
        setTotalResults(parseInt(data.totalResults));
      } else {
        setMovies([]);
        setTotalResults(0);
      }
    } catch (error) {
      console.error("Error searching movies:", error);
      setMovies([]);
      setTotalResults(0);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setCurrentPage(1);
    await loadMovies(1);
  };

  const handlePageChange = async (newPage) => {
    if (newPage < 1 || newPage > Math.ceil(totalResults / moviesPerPage))
      return;
    setCurrentPage(newPage);
    await loadMovies(newPage);
  };

  const addToFavorites = (movieId) => {
    try {
      const existingMovie = Object.values(localStorage).find(
        (id) => id === movieId
      );
      if (existingMovie) {
        alert("This movie is already in your favorites!");
        return;
      }

      const key = `movie_${Math.random().toString(36).slice(2, 7)}`;
      localStorage.setItem(key, movieId);

      alert("Movie added to favorites!");
    } catch (error) {
      console.error("Error adding to favorites:", error);
      alert("Failed to add movie to favorites. Please try again.");
    }
  };

  const isInFavorites = (movieId) => {
    return Object.values(localStorage).some((id) => id === movieId);
  };

  function renderMovieItem(movie) {
    const img = movie.Poster !== "N/A" ? movie.Poster : "img/blank-poster.webp";
    const isFavorite = isInFavorites(movie.imdbID);

    return (
      <div className="fav-item">
        <div className="fav-poster">
          <Link to={`/movie?id=${movie.imdbID}`}>
            <img src={img} alt={`${movie.Title} Poster`} />
          </Link>
        </div>
        <div className="fav-details">
          <div className="fav-details-box">
            <div>
              <p className="fav-movie-name">
                <Link to={`/movie?id=${movie.imdbID}`}>{movie.Title}</Link>
              </p>
              <p className="fav-movie-year">
                <Link to={`/movie?id=${movie.imdbID}`}>{movie.Year}</Link>
              </p>
            </div>
            <div>
              <FontAwesomeIcon
                icon="bookmark"
                style={{
                  cursor: "pointer",
                }}
                className="bookmark click"
                onClick={() => addToFavorites(movie.imdbID)}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="row">
        <div className="landing">
          <div className="landing__description">
            <h1 className="title__description">
              Find your next movie night with
              <span className="aqua"> FOVIE</span>
            </h1>
          </div>
          <form onSubmit={handleSearch} className="search-box">
            <div className="search__container">
              <input
                type="search"
                placeholder="Search movies..."
                className="search__bar click"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="btn click" type="submit">
                <FontAwesomeIcon
                  icon="magnifying-glass"
                  className="aqua click"
                />
              </button>
            </div>
          </form>
          <div className="movie__loader">
            {isLoading ? (
              <div className="loading-container">
                <FontAwesomeIcon icon="spinner" className="spinner" spin />
              </div>
            ) : movies.length > 0 ? (
              <div className="movies-grid">
                {movies.map((movie) => renderMovieItem(movie))}
              </div>
            ) : (
              <div className="start-exploring">
                <FontAwesomeIcon icon="film" className="red film" />
                <span className="red">
                  {searchQuery ? "No movies found" : "Start Exploring!"}
                </span>
              </div>
            )}
          </div>
          {!isLoading && movies.length > 0 && (
            <div className="arrows">
              <button
                className="btn btn__arrow click"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <FontAwesomeIcon icon="arrow-left" className="arrow" />
              </button>
              <span className="page-info">
                Page {currentPage} of {Math.ceil(totalResults / moviesPerPage)}
              </span>
              <button
                className="btn btn__arrow click"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage >= Math.ceil(totalResults / moviesPerPage)}
              >
                <FontAwesomeIcon icon="arrow-right" className="arrow" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
