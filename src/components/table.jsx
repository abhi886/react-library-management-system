import React, { Component } from "react";
import TableHead from "./tableHead";
import TableBody from "./tableBody";
import Pagination from "./pagination";

class Table extends Component {
  state = {};
  handleMovieDelete = (movie) => {
    console.log(movie);
  };
  render() {
    const { movies, onDelete } = this.props;
    // console.log(this.props);
    return (
      <div className='col-8'>
        <p>There are {movies.length} movies in the database</p>
        <table className='table'>
          <TableHead />
          <TableBody movies={movies} onDelete={onDelete} />
        </table>
        <Pagination />
      </div>
    );
  }
}

export default Table;
