import React from "react";
import { Link } from "react-router-dom";
import SearchBox from "./searchBox";

function customers() {
  return (
    <div className=''>
      <div className='row'>
        <div className='col-md-12'>
          <Link
            to='/movies/new'
            className='btn btn-primary'
            style={{ marginBottom: 20 }}
          >
            New Movie
          </Link>
        </div>
      </div>
      <div>
        <button className='btn btn-primary studentButton'> Add Student</button>
      </div>
      <div className='searchStudentContainer'>
        <SearchBox value={"Search Student"} />
      </div>
    </div>
  );
}

export default customers;
