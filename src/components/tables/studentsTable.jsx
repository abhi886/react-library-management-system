import React, { useEffect } from "react";
import Table from "../common/table";
import { Link } from "react-router-dom";
import auth from "../../services/authService";

function StudentsTable({ students, sortColumn, onSort, onDelete }) {
  const user = auth.getCurrentUser();
  const columns = [
    {
      path: "firstName",
      label: "First Name",
      content: (student) => (
        <Link to={`/students/${student._id}`}>{student.firstName} </Link>
      ),
    },
    {
      path: "lastName",
      label: "Last Name",
    },
    {
      path: "email",
      label: "Email Address",
    },
    {
      path: "faculty",
      label: "Faculty",
    },
  ];
  const deleteColumn = {
    key: "delete",
    content: (student) => (
      <button
        onClick={() => {
          onDelete(student);
        }}
        className='btn btn-danger btn-sm'
      >
        Delete
      </button>
    ),
  };
  if (user && user.isAdmin) columns.push(deleteColumn);

  return (
    <div>
      <Table
        columns={columns}
        data={students}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    </div>
  );
}

export default StudentsTable;
