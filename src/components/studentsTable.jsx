import Table from "./common/table";

function StudentsTable({ students, sortColumn, onSort, onDelete }) {
  const columns = [
    {
      path: "firstName",
      label: "First Name",
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
    {
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
    },
  ];

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
