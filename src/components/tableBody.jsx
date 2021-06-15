import React, { Component } from "react";
import Like from "./common/like";

class TableBody extends Component {
  constructor(props) {
    super(props);
    this.state = this.props.movies;
  }

  handleLike = (movie) => {
    // console.log("Like Clicked", movie);
    const movies = [...this.props.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

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
              <Like liked={movie.like} onClick={() => this.handleLike(movie)} />
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
