import Table from "./common/table";
import { Link } from "react-router-dom";

function RentalssTable({ students, sortColumn, onSort, onDelete }) {
  const data = ["abhishekh", "maharjan"];
  const columns = [
    {
      path: "firstName",
      label: "First Name",
      //   content: (student) => (
      // <Link to={`/students/${student._id}`}>{student.firstName} </Link>
      //   ),
    },
    {
      path: "lastName",
      label: "Last Name",
    },
    // {
    //   path: "email",
    //   label: "Email Address",
    // },
    // {
    //   path: "faculty",
    //   label: "Faculty",
    // },
    // {
    //   key: "delete",
    //   content: (student) => (
    //     <button
    //       onClick={() => {
    //         onDelete(student);
    //       }}
    //       className='btn btn-danger btn-sm'
    //     >
    //       Delete
    //     </button>
    //   ),
    // },
  ];

  return (
    <div>
      <Table
        columns={columns}
        data={data}
        sortColumn={sortColumn}
        // onSort={onSort}
      />
    </div>
  );
}

export default RentalssTable;
