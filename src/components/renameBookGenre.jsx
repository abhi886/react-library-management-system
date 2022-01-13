import React, { useState, useEffect } from "react";
import CancelButton from "./common/cancelButton";
import { getGenres } from "../services/genreService";
import { getMovieToRenameGenre } from "../services/movieService";
import RenameGenreTable from "./renameGenre/renameGenreTable";

function RenameBookGenre(props) {
  const genreId = props.match.params.id;

  const [genres, SetGenres] = useState([]);
  const [movies, SetMovies] = useState([]);

  useEffect(() => {
    SetGenresToRename();
    SetMoviesToRename();
  }, []);

  const SetGenresToRename = async () => {
    const { data } = await getGenres();
    SetGenres(data);
  };

  const SetMoviesToRename = async () => {
    const { data } = await getMovieToRenameGenre(props.match.params.id);
    SetMovies(data);
  };

  return (
    <div className='container'>
      <h5>Rename Genre</h5>
      <RenameGenreTable books={movies} genres={genres} genreId={genreId} />
      <div>
        <CancelButton linkTo={`/genres/${genreId}`} />
      </div>
    </div>
  );
}

export default RenameBookGenre;
