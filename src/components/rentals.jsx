import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getMovie } from "../services/movieService";

const Rentals = (props) => {
  const history = useHistory();

  const [book, SetBook] = useState("");
  const [bookId, SetBookId] = useState("");

  async function populateMovie() {
    try {
      const movieId = props.match.params.id;
      console.log(movieId);
      // const { data: movie } = await getMovie(movieId);
      // SetStudentId(student.studentId);
      // SetStudentFName(student.firstName);
      // SetStudentLName(student.lastName);
      // SetStudentEmail(student.email);
      // SetStudentFaculty(student.faculty);
      // SetId(student._id);
      // SetBook(movie);
      // SetBookId(movieId);

      // SetStu(student);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) console.log("error");
    }
  }

  useEffect(() => {
    populateMovie();
  }, []);
  return (
    <div>
      <div className='bookInfo'>
        <h4>Book Info: </h4>
        <div>
          <p>Book Title:</p>
          <p>Book Genre:</p>
          <p>Book Stock:</p>
          <p>Rate:</p>
        </div>
        <div>
          <p>Assignt to</p>
        </div>
      </div>
      <div className='studentInfo'>
        <h4>Student Info</h4>
      </div>
    </div>
  );
};

export default Rentals;
