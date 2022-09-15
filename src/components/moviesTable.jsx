import React, { Component } from "react";
import { Link } from "react-router-dom";
import Like from "./common/like";
import Table from "./common/table";
import auth from "../services/authService";
import AddButton from "./common/addButton";

class MoviesTable extends Component {
  columns = [
    {
      path: "title",
      label: "Title",
      content: (movie) => (
        <Link to={`/movies/${movie._id}`}>{movie.title} </Link>
      ),
    },

    {
      path: "author",
      label: "Author",
    },
    {
      path: "genre.name",
      label: "Genre",
    },
    {
      // path: "tag.length",
      label: "Stock",
      content: (movie) => (
        <p>{movie.tag.filter((t) => t.status === "0").length}</p>
      ),
    },
    {
      path: "dailyRentalRate",
      label: "Rate",
    },
    // {
    //   key: "like",
    //   content: (movie) => (
    //     <Like liked={movie.liked} onClick={() => this.props.onLike(movie)} />
    //   ),
    // },
  ];

  hireColumn = {
    key: "hire",
    label: "Hire",
    content: (movie) => <Link to={`/hires/${movie._id}`}>Hire Book</Link>,
  };

  deleteColumn = {
    key: "delete",
    content: (movie) => (
      <button
        onClick={() => this.props.onDelete(movie)}
        className='btn btn-danger btn-sm'
      >
        Delete
      </button>
    ),
  };

  constructor() {
    super();
    const user = auth.getCurrentUser();
    if (user && user.isAdmin) this.columns.push(this.deleteColumn);
    if (user && user.isAdmin) this.columns.push(this.hireColumn);
  }
  render() {
    const { movies, sortColumn, onSort } = this.props;
    return (
      <Table
        columns={this.columns}
        data={movies}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default MoviesTable;
