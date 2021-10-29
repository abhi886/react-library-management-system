import React, { Component } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import MoviesTable from "./moviesTable";
import { getMovies, deleteMovie } from "../services/movieService";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import { getGenres } from "../services/genreService";
import SearchBox from "./searchBox";
// import
import _ from "lodash";
class Movies extends Component {
  state = {
    movies: [],
    pageSize: 11,
    currentPage: 1,
    genres: [],
    searchQuery: "",
    selectedGenre: { _id: "", name: "All Genres" },
    sortColumn: { path: "title", order: "asc" },
  };

  async componentDidMount() {
    const { data } = await getGenres();
    const genres = [{ _id: "", name: "All Genres" }, ...data];
    const { data: movies } = await getMovies();
    this.setState({ movies, genres });
  }

  handleDelete = async (movie) => {
    const originalMovies = this.state.movies;
    const movies = originalMovies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
    try {
      await deleteMovie(movie._id);
    } catch (ex) {
      toast.error("This movie has already been deleted");
      if (ex.response && ex.response.status === 404) {
        this.setState({ movies: originalMovies });
      }
    }
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
    this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };

  getPagedData = () => {
    const { length: count } = this.state.movies;
    const {
      pageSize,
      currentPage,
      movies: allMovies,
      selectedGenre,
      sortColumn,
      searchQuery,
    } = this.state;

    let filtered = allMovies;
    if (searchQuery)
      filtered = allMovies.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedGenre && selectedGenre._id)
      filtered = allMovies.filter((m) => m.genre._id === selectedGenre._id);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);
    return { totalCount: filtered.length, data: movies };
  };

  render() {
    const { user } = this.props;
    const { length: count } = this.state.movies;
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;

    if (count === 0) return <p>No movies in the database.</p>;

    const { totalCount, data: movies } = this.getPagedData();
    console.log(this.state.selectedGenre);

    return (
      <>
        <div className='container'>
          <div className='row mt-4'>
            <div className=' col-md-2 col-sm-8'>
              <ListGroup
                items={this.state.genres}
                selectedItem={this.state.selectedGenre}
                onItemSelect={this.handleGenreSelect}
                user={user}
              ></ListGroup>
            </div>
            <div className='col-md-10 col-sm-8'>
              <div className='row'>
                <div className='col-md-12'>
                  {user && (
                    <Link
                      to='/movies/new'
                      className='btn btn-primary'
                      style={{ marginBottom: 20 }}
                    >
                      New Movie
                    </Link>
                  )}
                </div>
              </div>
              <p>Showing {totalCount} movies in the database</p>
              <SearchBox
                value={searchQuery}
                onChange={this.handleSearch}
              ></SearchBox>
              <MoviesTable
                movies={movies}
                sortColumn={sortColumn}
                onLike={this.handleLike}
                onDelete={this.handleDelete}
                onSort={this.handleSort}
              />
              <Pagination
                itemsCount={totalCount}
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
