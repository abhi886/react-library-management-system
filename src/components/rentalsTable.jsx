import Table from "./common/table";

function RentalsTable({ rentals, sortColumn, onSort, onDelete }) {
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
      label: "Status",
      content: (rental) =>
        rental && rental.status === true ? <p>On Hire</p> : <p>Over Due</p>,
    },
    {
      key: "delete",
      content: (rental) => (
        <button
          onClick={() => {
            console.log(rental);
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
