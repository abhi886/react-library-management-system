import React from "react";
import { Link } from "react-router-dom";
import Table from "./common/table";
import auth from "../services/authService";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";

const MoviesTable = ({ movies, sortColumn, onSort, onDelete, user }) => {
  const history = useHistory();
  const [columns, SetColumns] = useState([
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
      showOnSmallScreen: false,
    },
    {
      path: "genre.name",
      label: "Genre",
      showOnSmallScreen: false,
    },
    {
      // path: "tag.length",
      label: "Stock",
      content: (movie) => (
        <p>{movie.tag.filter((t) => t.status === "0").length}</p>
      ),
      showOnSmallScreen: false,
    },
    {
      path: "dailyRentalRate",
      label: "Rate",
      showOnSmallScreen: false,
    },
    // {
    //   key: "like",
    //   content: (movie) => (
    //     <Like liked={movie.liked} onClick={() => this.props.onLike(movie)} />
    //   ),
    // },
  ]);

  // hireColumn = {
  //   key: "hire",
  //   label: "Hire",
  //   content: (movie) => <Link to={`/hires/${movie._id}`}>Hire Book</Link>,
  // };

  const hireColumn = {
    key: "hire",
    label: "Hire",
    content: (movie) => (
      <button
        onClick={() => {
          history.push(`/hires/${movie._id}`);
        }}
        className='btn btn-success btn-sm'
      >
        Hire
      </button>
    ),
  };
  const deleteColumn = {
    key: "delete",
    label: "Delete",
    content: (movie) => (
      <button onClick={() => onDelete(movie)} className='btn btn-danger btn-sm'>
        Delete
      </button>
    ),
  };
  const getUser = async () => {
    try {
      const user = await auth.getCurrentUser();
      return user;
    } catch (ex) {}
  };
  useEffect(() => {
    if (user && user.isAdmin)
      SetColumns((columns) => [...columns, hireColumn, deleteColumn]);
    // if (user && user.isAdmin) SetColumns((columns) => [...columns, hireColumn]);
  }, []);
  // console.log(columns);
  return (
    <Table
      columns={columns}
      data={movies}
      sortColumn={sortColumn}
      onSort={onSort}
    />
  );
};

export default MoviesTable;
