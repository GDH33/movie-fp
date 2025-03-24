import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../App.css";

const Movie = () => {
  const [movieData, setMovieData] = useState(null);
  const urlQueryParams = new URLSearchParams(window.location.search);
  const id = urlQueryParams.get("id");
  const apikey = "239474ee";

  useEffect(() => {
    const fetchMovieData = async () => {
      if (!id) return;

      try {
        const movieUrl = `https://www.omdbapi.com/?apikey=${apikey}&i=${id}`;
        const res = await fetch(movieUrl);
        const data = await res.json();
        setMovieData(data);
      } catch (error) {
        console.error("Error fetching movie data:", error);
      }
    };

    fetchMovieData();
  }, [id, apikey]);

  if (!id) {
    return (
      <div className="no-movie-container">
        <p className="no__movie">No movie found</p>
        <FontAwesomeIcon icon="film" className="red flim no__flim" />
      </div>
    );
  }

  if (!movieData) {
    return (
      <div className="loading-container">
        <FontAwesomeIcon icon="spinner" className="spinner" spin />
      </div>
    );
  }

  const addToFavorites = (movieId) => {
    console.log("Adding to favorites:", movieId);
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

  return (
    <div className="container">
      <div className="row">
        <div className="browse__wrapper">
          <div className="main">
            <div className="movie-container">
              <div className="movie-poster">
                <img src={movieData.Poster} alt="Movie Poster" />
              </div>
              <div className="movie-details">
                <div className="details-header">
                  <span className="italics-text">
                    <i className="movie-details-italic">
                      {movieData.Year} • {movieData.Country} • Rating -{" "}
                      <span style={{ fontSize: "18px", fontWeight: 600 }}>
                        {movieData.imdbRating}
                      </span>
                      /10
                    </i>
                  </span>
                  <ul className="details-ul">
                    <li>
                      <strong>Actors: </strong>
                      {movieData.Actors}
                    </li>
                    <li>
                      <strong>Director: </strong>
                      {movieData.Director}
                    </li>
                    <li>
                      <strong>Writers: </strong>
                      {movieData.Writer}
                    </li>
                  </ul>
                  <ul className="details-ul">
                    <li>
                      <strong>Genre: </strong>
                      {movieData.Genre}
                    </li>
                    <li>
                      <strong>Release Date: </strong>
                      {movieData.DVD}
                    </li>
                    <li>
                      <strong>Box Office: </strong>
                      {movieData.BoxOffice}
                    </li>
                    <li>
                      <strong>Movie Runtime: </strong>
                      {movieData.Runtime}
                    </li>
                  </ul>
                  <p style={{ fontSize: "14px", marginTop: "10px" }}>
                    {movieData.Plot}
                  </p>
                  <p
                    style={{
                      fontSize: "15px",
                      fontStyle: "italic",
                      color: "#222",
                      marginTop: "10px",
                    }}
                  >
                    <FontAwesomeIcon icon="award" className="award red" />
                    &nbsp;{movieData.Awards}
                  </p>
                </div>
                <div className="dh-ls">
                  <h2>{movieData.Title}</h2>
                  <div className="dh-rs">
                    <FontAwesomeIcon
                      icon="bookmark"
                      className="bookmark  click"
                      onClick={() => addToFavorites(id)}
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Movie;
