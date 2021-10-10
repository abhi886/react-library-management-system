import React from "react";
import { Link } from "react-router-dom";
import SearchBox from "./searchBox";

function students() {
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

      <div className='searchStudentContainer'>
        <SearchBox value={"Search Student"} />
      </div>
    </div>
  );
}

export default students;
