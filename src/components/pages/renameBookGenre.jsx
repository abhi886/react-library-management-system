import React, { useState, useEffect } from "react";
import CancelButton from "components/common/cancelButton";
import { getGenres } from "services/genreService";
import { getMovieToRenameGenre } from "services/movieService";
import RenameGenreTable from "components/tables/renameGenreTable";

function RenameBookGenre(props) {
  const genreId = props.match.params.id;

  const [genres, SetGenres] = useState([]);
  const [movies, SetMovies] = useState([]);
  const [reload, SetReload] = useState(true);

  useEffect(() => {
    SetGenresToRename();
    SetMoviesToRename();
  }, [reload]);

  const SetGenresToRename = async () => {
    const { data } = await getGenres();
    SetGenres(data);
  };

  const SetMoviesToRename = async () => {
    const { data } = await getMovieToRenameGenre(props.match.params.id);
    SetMovies(data);
  };

  const handleReload = () => {
    SetReload(!reload);
  };

  return (
    <div className='container'>
      <h3 className='mt-4'>Rename Genre</h3>

      <RenameGenreTable
        books={movies}
        genres={genres}
        genreId={genreId}
        reloadComponent={handleReload}
      />
      <div>
        <CancelButton linkTo={`/genres/${genreId}`} />
      </div>
    </div>
  );
}

export default RenameBookGenre;
