import React from "react";
import { useHistory } from "react-router-dom";

function EditGenre({ selectedItem, name, linkTo, user }) {
  const history = useHistory();

  const handleClick = (selectedItem, linkTo) => {
    history.push({
      pathname: `/${linkTo}/${selectedItem._id}`,
    });
  };
  return (
    <>
      {" "}
      {user && (
        <button
          className='btn btn-warning btn-md'
          onClick={() => {
            handleClick(selectedItem, linkTo);
          }}
          disabled={selectedItem._id === "" ? true : false}
        >
          Edit {name}
        </button>
      )}
    </>
  );
}

export default EditGenre;
