import React, { Component } from "react";
import MoviesTable from "./moviesTable";
import { getMovies } from "../services/fakeMovieService";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import { getGenres } from "../services/fakeGenreService";
// import MoviesTable from "./MoviesTable";
class Movies extends Component {
  state = {
    movies: [],
    pageSize: 4,
    currentPage: 1,
    genres: [],
  };

  componentDidMount() {
    const genres = [{ name: "All Genres" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
  }

  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  render() {
    const { length: count } = this.state.movies;
    const {
      pageSize,
      currentPage,
      movies: allMovies,
      selectedGenre,
    } = this.state;

    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
        : allMovies;

    if (count === 0) return <p>No movies in the database.</p>;

    const movies = paginate(filtered, currentPage, pageSize);

    return (
      <>
        <div className='container'>
          <div className='row'>
            <div className='col-2'>
              <ListGroup
                items={this.state.genres}
                selectedItem={this.state.selectedGenre}
                onItemSelect={this.handleGenreSelect}
              ></ListGroup>
            </div>
            <div className='col-8'>
              <p>Showing {filtered.length} movies in the database</p>
              <MoviesTable
                movies={movies}
                onLine={this.handleLike}
                onDelete={this.handleDelete}
              />
              <Pagination
                itemsCount={filtered.length}
                currentPage={currentPage}
                pageSize={pageSize}
                onPageChange={this.handlePageChange}
              />
            </div>{" "}
          </div>
        </div>
      </>
    );
  }
}

export default Movies;
