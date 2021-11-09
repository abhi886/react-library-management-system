import React from "react";
import { Link } from "react-router-dom";

function AddButton({ linkTo, name, user }) {
  return (
    <>
      {" "}
      {user && (
        <Link to={linkTo} className='btn btn-primary btn-sm'>
          Add {name}
        </Link>
      )}
    </>
  );
}

export default AddButton;
