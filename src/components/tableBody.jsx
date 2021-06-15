import React, { Component } from "react";
import Like from "./common/like";

class TableBody extends Component {
  render() {
    const { movies, onLike, onDelete } = this.props;
    return (
      <tbody>
        {movies.map((movie) => (
          <tr key={movie._id}>
            <td>{movie.title}</td>
            <td>{movie.genre.name}</td>
            <td>{movie.numberInStock}</td>
            <td> {movie.dailyRentalRate} </td>
            <td>
              <Like liked={movie.like} onClick={() => onLike(movie)} />
            </td>
            <td>
              <button
                type='button'
                className='btn btn-danger'
                onClick={() => onDelete(movie)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
