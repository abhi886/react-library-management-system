import React from "react";
import GenreRenameOption from "components/common/genreRenameOption";

function RenameGenreTable({
  books,
  genres,
  genreId,
  genreName,
  reloadComponent,
}) {
  return (
    <div>
      <table className='table'>
        <thead className='thead-dark'>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>Book Name</th>
            <th scope='col'>Author</th>
            <th scope='col'>Genre</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, i) => (
            <tr key={book._id}>
              <th scope='row'>{i + 1}</th>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>
                <GenreRenameOption
                  bookId={book._id}
                  genres={genres}
                  genreId={genreId}
                  reloadComponent={reloadComponent}
                >
                  {" "}
                </GenreRenameOption>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RenameGenreTable;
