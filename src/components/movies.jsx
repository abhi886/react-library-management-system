import React, { Component } from "react";
import { paginate } from "./utils/paginate";
// import Genres from "./genres";
import ListGroup from "./common/listGroup";
import Table from "./table";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import NoMovies from "./common/noMovies";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
    selectedGenre: { _id: "" },
  };

  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
    // this.setState({  });
  }

  handleMovieDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies: movies });
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].like = !movies[index].like;
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreClick = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };
  render() {
    const {
      genres,
      movies: allMovies,
      pageSize,
      currentPage,
      selectedGenre,
    } = this.state;
    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
        : allMovies;
    const movies = paginate(filtered, currentPage, pageSize);
    return (
      <>
        <div className='row m-2'>
          <div className='col-2'>
            {/* <Genres genres={genres} onGenreClick={this.handleGenreClick} /> */}
            <ListGroup
              selectedItem={this.state.selectedGenre}
              items={genres}
              onItemClick={this.handleGenreClick}
            />
          </div>
          {allMovies.length !== 0 ? (
            <Table
              movies={movies}
              onDelete={this.handleMovieDelete}
              onLike={this.handleLike}
              onPageChange={this.handlePageChange}
              pageSize={pageSize}
              itemsCount={filtered.length}
              currentPage={currentPage}
              allMovies={allMovies}
            />
          ) : (
            <NoMovies />
          )}
        </div>
      </>
    );
  }
}

export default Movies;
