import React from "react";

const NavBar = ({ totalCounters }) => {
  return (
    <nav className='navbar navbar-light bg-light'>
      <h1 className='navbar-brand' href='#'>
        Navbar
        <span className='badge bg-pill bg-secondary m-2'>{totalCounters}</span>
      </h1>
    </nav>
  );
};

export default NavBar;
