import Table from "./common/table";
import { useHistory } from "react-router-dom";

function RentalsTable({ rentals, sortColumn, onSort, onDelete }) {
  const history = useHistory();

  const columns = [
    {
      path: "bookTitle",
      label: "Book Title",
    },
    {
      path: "bookCode",
      label: "Book Code",
    },
    {
      path: "author",
      label: "Book Author",
    },
    {
      path: "studentName",
      label: "Student Name",
    },
    {
      path: "studentId",
      label: "Student Id",
    },
    {
      path: "studentFaculty",
      label: "Student Faculty",
    },
    {
      path: "status",
      label: "Delete",
      content: (rental) =>
        rental && rental.status === true ? <p>On Hire</p> : <p>Over Due</p>,
    },
    {
      key: "delete",
      content: (rental) => (
        <button
          onClick={() => {
            history.push(`/rentals/return/${rental._id}`);
          }}
          className='btn btn-primary btn-sm'
        >
          Return Book
        </button>
      ),
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        data={rentals}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    </div>
  );
}

export default RentalsTable;
