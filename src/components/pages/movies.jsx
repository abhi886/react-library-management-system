import React, { useState, useEffect, useMemo } from "react";
import { toast } from "react-toastify";
import MoviesTable from "components/tables/moviesTable";
import { getMovies, deleteMovie } from "services/movieService";
import Pagination from "components/common/pagination";
import { paginate } from "utils/paginate";
import ListGroup from "components/common/listGroup";
import { getGenres } from "services/genreService";
import SearchBox from "components/common/searchBox";
import _ from "lodash";
import AddButton from "components/common/addButton";
import EditButton from "components/common/editButton";
import LoadingSpinner from "../common/loadingSpinner";

export const Movies = ({ user }) => {
  const PAGESIZE = 6;
  const [movies, SetMovies] = useState([]);
  const [currentPage, SetCurrentPage] = useState(1);
  const [genres, SetGenres] = useState([]);
  const [searchQuery, SetSearchQuery] = useState("");
  const [selectedGenre, SetSelectedGenre] = useState({
    _id: "",
    name: "All Genres",
  });
  const [isLoading, SetIsLoading] = useState(true);
  const [sortColumn, SetSortColumn] = useState({ path: "", order: "" });

  async function fetchGenres() {
    try {
      const { data } = await getGenres();
      const genres = [{ _id: "", name: "All Genres" }, ...data];
      SetGenres(genres);
      SetIsLoading(false);
    } catch (ex) {
      SetIsLoading(false);
      console.log(ex);
      return;
    }
  }

  async function fetchMovies() {
    try {
      const { data: movies } = await getMovies();
      SetMovies(movies);
      SetIsLoading(false);
    } catch (ex) {
      SetIsLoading(false);
      console.log(ex);
      return;
    }
  }
  useEffect(() => {
    fetchGenres();
    fetchMovies();
  }, []);

  const getFilteredItems = useMemo(() => {
    return movies.filter((m) =>
      m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
    );
  }, [movies, searchQuery]);

  const { totalCount, data } = useMemo(() => {
    if (!movies) return { totalCount: 0, data: {} };
    let filtered = movies;
    if (searchQuery) {
      filtered = getFilteredItems;
    } else if (selectedGenre && selectedGenre._id)
      filtered = movies.filter((m) => m.genre._id === selectedGenre._id);
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const finalData = paginate(sorted, currentPage, PAGESIZE);
    return { totalCount: filtered.length, data: finalData };
  }, [
    movies,
    currentPage,
    getFilteredItems,
    searchQuery,
    selectedGenre,
    sortColumn.order,
    sortColumn.path,
  ]);

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

  return (
    <>
      {isLoading ? (
        <LoadingSpinner type={"spokes"} color={"#0b3060"} />
      ) : (
        <div className='container'>
          <div className='d-flex flex-row mt-3'>
            <div className='me-3'>
              <AddButton
                linkTo='/genres/new'
                name='Genre'
                user={user}
              ></AddButton>
            </div>
            <div>
              <EditButton
                selectedItem={selectedGenre}
                name='Genre'
                linkTo='genres'
                user={user}
              ></EditButton>
            </div>
          </div>
          <div className='row'>
            <div className='col-md-2 col-sm-8 col-12'>
              <ListGroup
                items={genres}
                selectedItem={selectedGenre}
                onItemSelect={handleGenreSelect}
                user={user}
              ></ListGroup>
            </div>
            <div className='col-md-9 col-sm-12 col-12'>
              <div className='row'>
                <div className='col-12 mt-3'>
                  {user && (
                    <AddButton
                      linkTo='/books/new'
                      name='Book'
                      user={user}
                    ></AddButton>
                  )}
                </div>
                <div className='col-12'>
                  <SearchBox
                    value={searchQuery}
                    onChange={handleSearch}
                  ></SearchBox>
                </div>
              </div>
              <p>Showing {totalCount} movies in the database</p>
              <MoviesTable
                movies={data}
                sortColumn={sortColumn}
                onDelete={handleDelete}
                onSort={handleSort}
                user={user}
              />
              <Pagination
                itemsCount={totalCount}
                currentPage={currentPage}
                pageSize={PAGESIZE}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Movies;
