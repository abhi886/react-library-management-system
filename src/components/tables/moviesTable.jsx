import React from "react";
import { Link } from "react-router-dom";
import Table from "components/common/table";
import auth from "services/authService";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCurrentUser } from "services/authService";

const MoviesTable = ({ movies, sortColumn, onSort, onDelete }) => {
  const history = useHistory();
  const [user, SetUser] = useState("");
  const [columns, SetColumns] = useState([
    {
      path: "title",
      label: "Title",
      content: (movie) => (
        <Link to={`/books/${movie._id}`}>{movie.title} </Link>
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
      SetUser(user);
      if (user && user.isAdmin)
        SetColumns((columns) => [...columns, hireColumn, deleteColumn]);
    } catch (ex) {}
  };
  useEffect(() => {
    getUser();
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
