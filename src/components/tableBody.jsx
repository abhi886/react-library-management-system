import React, { Component } from "react";
class TableBody extends Component {
  state = {};
  render() {
    const { movies } = this.props;
    return (
      <tbody>
        {movies.map((movie) => (
          <tr key={movie._id}>
            <td>{movie.title}</td>
            <td>{movie.genre.name}</td>
            <td>{movie.numberInStock}</td>
            <td> {movie.dailyRentalRate} </td>
            <td>
              <i className='fa fa-thumbs-up' aria-hidden='true'></i>
            </td>
            <td>
              <button
                type='button'
                className='btn btn-danger'
                onClick={() => this.props.onDelete(movie)}
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
