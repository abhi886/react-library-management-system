import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SearchBox from "./searchBox";
import StudentsTable from "./studentsTable";
import { getStudents } from "../services/studentService";
import ListGroup from "./common/listGroup";

function Students() {
  const [student, SetStudent] = useState([]);
  async function populateStudents() {
    try {
      const stu = await getStudents();
      SetStudent(stu.data);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) console.log("error");
      return;
    }
  }
  useEffect(() => {
    populateStudents();
  }, []);
  return (
    <div className='studentButton'>
      <div className='row'>
        <div className='col-md-12'>
          <Link
            to='/students/new'
            className='btn btn-primary'
            style={{ marginBottom: 20 }}
          >
            Add New Student
          </Link>
        </div>
      </div>
      <div className='row'>
        <div className='col-md-4'>
          <ListGroup
            items={student}
            // selectedItem={this.state.selectedGenre}
            // onItemSelect={this.handleGenreSelect}
            // user={user}
          ></ListGroup>{" "}
        </div>
        <div className='col-md-8'>
          {" "}
          <SearchBox value={"Search Student"} />
          {student && <StudentsTable students={student} />}
        </div>
      </div>
    </div>
  );
}

export default Students;
