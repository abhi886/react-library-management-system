import React, { useState } from "react";
import { renameMovieToRenameGenre } from "../../services/movieService";

function GenreRenameOption({
  bookId,
  genres,
  genreId,
  onGenreChange,
  reloadComponent,
}) {
  const [genId, SetGenId] = useState(genreId);
  const [genName, SetGenName] = useState("");

  const handleChange = (event) => {
    SetGenId(event.target.value);
    SetGenName(event.target.options[event.target.selectedIndex].text);
  };

  const handleEdit = async () => {
    try {
      const genre = { id: genId, name: genName };
      await renameMovieToRenameGenre(bookId, genre);
      reloadComponent();
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
        onClick={() => handleEdit()}
        type='button'
        className='btn btn-primary ms-4'
      >
        Edit
      </button>{" "}
    </>
  );
}

export default GenreRenameOption;
