import React from "react";

function withButton({ handleClick, children }) {
  return (
    <button
      style={{ float: "right" }}
      onClick={handleClick}
      className='btn btn-primary'
    >
      {children}
    </button>
  );
}

export default withButton;
