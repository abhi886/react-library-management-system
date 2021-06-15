import React, { Component } from "react";
import { paginate } from "./utils/paginate";
import Genres from "./genres";
import Table from "./table";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import NoMovies from "./common/noMovies";

class Movies extends Component {
  state = {
    movies: getMovies(),
    genres: getGenres(),
    currentPage: 1,
    pageSize: 2,
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

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };
  render() {
    const { genres, movies: allMovies, pageSize, currentPage } = this.state;
    const movies = paginate(allMovies, currentPage, pageSize);
    return (
      <>
        <div className='container'>
          <div className='row'>
            <Genres genres={genres} />
            {allMovies.length !== 0 ? (
              <Table
                movies={movies}
                onDelete={this.handleMovieDelete}
                onLike={this.handleLike}
                onPageChange={this.handlePageChange}
                pageSize={pageSize}
                itemsCount={this.state.movies.length}
                currentPage={currentPage}
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
