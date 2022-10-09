import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import MoviesTable from "./moviesTable";
import { getMovies, deleteMovie } from "../services/movieService";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import { getGenres } from "../services/genreService";
import SearchBox from "./searchBox";
import _ from "lodash";
import AddButton from "./common/addButton";
import EditButton from "./common/editButton";

export const Movies = ({ user }) => {
  const [movies, SetMovies] = useState([]);
  const [pageSize] = useState(5);
  const [currentPage, SetCurrentPage] = useState(1);
  const [genres, SetGenres] = useState([]);
  const [searchQuery, SetSearchQuery] = useState("");
  const [selectedGenre, SetSelectedGenre] = useState({
    _id: "",
    name: "All Genres",
  });
  const [sortColumn, SetSortColumn] = useState({ path: "", order: "" });

  async function fetchGenres() {
    try {
      const { data } = await getGenres();
      const genres = [{ _id: "", name: "All Genres" }, ...data];
      SetGenres(genres);
    } catch (ex) {
      return;
    }
  }

  async function fetchMovies() {
    try {
      const { data: movies } = await getMovies();
      SetMovies(movies);
    } catch (ex) {
      return;
    }
  }
  useEffect(() => {
    fetchGenres();
    fetchMovies();
  }, []);

  const getPagedData = (moviesToFilter) => {
    if (!moviesToFilter) return { totalCount: 0, data: {} };
    const allMovies = moviesToFilter;
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

  const handleDelete = async (movie) => {
    const originalMovies = movies;
    const moviesAfterDeletion = movies.filter((m) => m._id !== movie._id);
    SetMovies(moviesAfterDeletion);
    try {
      await deleteMovie(movie._id);
    } catch (ex) {
      toast.error("This movie has already been deleted");
      if (ex.response && ex.response.status === 404) {
        SetMovies(originalMovies);
      }
    }
  };

  const handlePageChange = (page) => {
    SetCurrentPage(page);
  };

  const handleGenreSelect = (item) => {
    SetSelectedGenre(item);
    SetSearchQuery("");
    SetCurrentPage(1);
  };

  const handleSort = (sortColumn) => {
    SetSortColumn(sortColumn);
  };

  const handleSearch = (query) => {
    SetSearchQuery(query);
    SetSelectedGenre({ _id: "", name: "All Genres" });
    SetCurrentPage(1);
  };

  const { totalCount, data } = getPagedData(movies);
  if (totalCount === 0)
    return (
      <div className='container'>
        <p>No movies in the database.</p>
      </div>
    );

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
                  selectedItem={selectedGenre}
                  name='Genre'
                  linkTo='genres'
                  user={user}
                ></EditButton>
              </div>
            </div>
            <ListGroup
              items={genres}
              selectedItem={selectedGenre}
              onItemSelect={handleGenreSelect}
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
            <SearchBox value={searchQuery} onChange={handleSearch}></SearchBox>
            <p>Showing {totalCount} movies in the database</p>
            <MoviesTable
              movies={data}
              sortColumn={sortColumn}
              onDelete={handleDelete}
              onSort={handleSort}
            />
            <Pagination
              itemsCount={totalCount}
              currentPage={currentPage}
              pageSize={pageSize}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Movies;
