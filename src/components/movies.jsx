import React, { Component } from "react";
import Genres from "./genres";
import Table from "./table";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import NoMovies from "./common/noMovies";

class Movies extends Component {
  state = {
    movies: getMovies(),
    genres: getGenres(),
  };

  handleMovieDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies: movies });
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].like = !movies[index].liked;
    this.setState({ movies });
  };
  render() {
    const { genres, movies } = this.state;
    return (
      <>
        <div className='container'>
          <div className='row'>
            <Genres genres={genres} />
            {movies.length !== 0 ? (
              <Table
                movies={movies}
                onDelete={this.handleMovieDelete}
                onLike={this.handleLike}
              />
            ) : (
              <NoMovies />
            )}
          </div>
        </div>
      </>
    );
  }
}

export default Movies;
