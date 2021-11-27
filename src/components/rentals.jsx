import React, { useEffect, useState } from "react";
// import { useHistory } from "react-router-dom";
import RentalsTable from "./rentalsTable";

const Rentals = (props) => {
  const [sortColumn, SetSortColumn] = useState({
    path: "firstName",
    order: "desc",
  });
  // const history = useHistory();

  // const [book, SetBook] = useState("");
  // const [bookId, SetBookId] = useState("");

  // async function populateMovie() {
  //   try {
  //     const movieId = props.match.params.id;
  //     console.log(movieId);
  //     // const { data: movie } = await getMovie(movieId);
  //     // SetStudentId(student.studentId);
  //     // SetStudentFName(student.firstName);
  //     // SetStudentLName(student.lastName);
  //     // SetStudentEmail(student.email);
  //     // SetStudentFaculty(student.faculty);
  //     // SetId(student._id);
  //     // SetBook(movie);
  //     // SetBookId(movieId);

  //     // SetStu(student);
  //   } catch (ex) {
  //     if (ex.response && ex.response.status === 404) console.log("error");
  //   }
  // }

  // useEffect(() => {
  //   populateMovie();
  // }, []);
  return (
    <div className='container'>
      <RentalsTable sortColumn={sortColumn} />
    </div>
  );
};

export default Rentals;
