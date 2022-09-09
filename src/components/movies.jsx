import React, { Component } from "react";
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
import AddButton from "./common/addButton";
import EditButton from "./common/editButton";

class Movies extends Component {
  state = {
    movies: [],
    pageSize: 5,
    currentPage: 1,
    genres: [],
    searchQuery: "",
    selectedGenre: { _id: "", name: "All Genres" },
    sortColumn: { path: "", order: "" },
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
    this.setState({
      searchQuery: query,
      selectedGenre: { _id: "", name: "All Genres" },
      currentPage: 1,
    });
  };

  getPagedData = () => {
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

    return (
      <>
        <div className='container'>
          <div className='row mt-4'>
            <div className=' col-md-2 col-sm-12'>
              <div className='row'>
                <div className='col-md-6'>
                  <AddButton
                    linkTo='/genres/new'
                    name=' Genre'
                    user={user}
                  ></AddButton>
                </div>
                <div className='col-md-6'>
                  <EditButton
                    selectedItem={this.state.selectedGenre}
                    name='Genre'
                    linkTo='genres'
                    user={user}
                  ></EditButton>
                </div>
              </div>
              <ListGroup
                items={this.state.genres}
                selectedItem={this.state.selectedGenre}
                onItemSelect={this.handleGenreSelect}
                user={user}
              ></ListGroup>
            </div>
            <div className='col-md-10 col-sm-12'>
              <div className='row'>
                <div className='col-md-12'>
                  {user && (
                    <AddButton
                      linkTo='/movies/new'
                      name='Book'
                      user={user}
                    ></AddButton>
                  )}
                </div>
              </div>
              <SearchBox
                value={searchQuery}
                onChange={this.handleSearch}
              ></SearchBox>
              <p>Showing {totalCount} movies in the database</p>
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
