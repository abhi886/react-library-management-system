import React from "react";
import { Link } from "react-router-dom";

function CancelButton({ linkTo }) {
  return (
    <>
      {" "}
      <Link to={linkTo} className='btn btn-danger btn-md mt-2'>
        Cancel
      </Link>
    </>
  );
}

export default CancelButton;
