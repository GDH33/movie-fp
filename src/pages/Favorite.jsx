import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Favorite = () => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const apiKey = "239474ee";

  useEffect(() => {
    loadFavoriteMovies();
  }, []);

  const loadFavoriteMovies = async () => {
    setIsLoading(true);
    try {
      const movies = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const id = localStorage.getItem(key);

        if (id) {
          const movieUrl = `https://www.omdbapi.com/?apikey=${apiKey}&i=${id}`;
          const res = await fetch(movieUrl);
          const data = await res.json();

          if (data.Response === "True") {
            movies.push({ ...data, storageKey: key });
          }
        }
      }
      setFavoriteMovies(movies);
    } catch (error) {
      console.error("Error loading favorites:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromFavorites = async (movieId) => {
    if (!movieId) {
      alert("Invalid movie ID");
      return;
    }

    try {
      const key = Object.keys(localStorage).find(
        (key) => localStorage.getItem(key) === movieId
      );

      if (key) {
        localStorage.removeItem(key);
        setFavoriteMovies(prevMovies => 
          prevMovies.filter(movie => movie.imdbID !== movieId)
        );
        alert("Movie removed from favorites");
      } else {
        alert("Movie not found in favorites");
      }
    } catch (error) {
      console.error("Error removing movie:", error);
      alert("Error removing movie from favorites");
    }
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading">
          <FontAwesomeIcon icon="spinner" className="spinner" spin />
          <span>Loading favorites...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="main">
        <div className="fav-container">
          {favoriteMovies.length === 0 ? (
            <div className="no-favorites">
              <FontAwesomeIcon icon="film" className="red" />
              <span className="red">No favorite movies yet!</span>
            </div>
          ) : (
            favoriteMovies.map(movie => (
              <div key={movie.imdbID} className="fav-item">
                <div className="fav-poster">
                  <Link to={`/movie?id=${movie.imdbID}`}>
                    <img 
                      src={movie.Poster !== "N/A" ? movie.Poster : "/img/blank-poster.webp"} 
                      alt={`${movie.Title} Poster`} 
                    />
                  </Link>
                </div>
                <div className="fav-details">
                  <div className="fav-details-box">
                    <div>
                      <p className="fav-movie-name">{movie.Title}</p>
                      <p className="fav-movie-rating">
                        {movie.Year} • <span style={{ fontSize: "15px", fontWeight: 600 }}>
                          {movie.imdbRating}
                        </span>/10
                      </p>
                    </div>
                    <div style={{ color: "maroon" }}>
                      <FontAwesomeIcon 
                        icon="trash" 
                        style={{ cursor: "pointer" }}
                        onClick={() => removeFromFavorites(movie.imdbID)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Favorite;