import React, { useState } from "react";
import { renameMovieToRenameGenre } from "../../services/movieService";

function GenreRenameOption({ bookId, genres, genreId, onGenreChange }) {
  const [genId, SetGenId] = useState(genreId);
  const [genName, SetGenName] = useState("");
  const [freeze, SetFreeze] = useState(false);

  const handleChange = (event) => {
    SetGenId(event.target.value);
    SetGenName(event.target.options[event.target.selectedIndex].text);
  };

  const handleEdit = async () => {
    try {
      const genre = { id: genId, name: genName };
      const result = await renameMovieToRenameGenre(bookId, genre);
      SetFreeze(true);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <select value={genId} onChange={(e) => handleChange(e)}>
        {genres.map((genre) => (
          <option key={genre._id} value={genre._id}>
            {" "}
            {genre.name}{" "}
          </option>
        ))}
      </select>
      <button
        disabled={freeze && true}
        onClick={() => handleEdit()}
        type='button'
        className='btn btn-primary'
      >
        Edit
      </button>{" "}
    </>
  );
}

export default GenreRenameOption;
