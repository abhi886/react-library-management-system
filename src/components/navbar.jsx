import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";

const NavBar = ({ user }) => {
  const [collapse, SetCollapse] = useState(true);
  const handleCollapse = () => {
    SetCollapse(!collapse);
  };
  return (
    <nav className='navbar navbar-expand-lg navbar-light  navContainer'>
      <NavLink className='navbar-brand navHeading' to='/'>
        Library Management System
      </NavLink>
      <button
        className='navbar-toggler'
        type='button'
        data-toggle='collapse'
        data-target='#navbarSupportedContent'
        aria-controls='navbarSupportedContent'
        aria-expanded='false'
        aria-label='Toggle navigation'
      >
        <span onClick={() => handleCollapse()}>
          <i className='fas fa-bars'></i>
        </span>
      </button>

      <div
        className={
          collapse === true ? "navbar-collapse" : " navbar-collapse custom-c"
        }
        id='navbarSupportedContent'
      >
        <div className='navbar-nav mr-auto'>
          <NavLink className='nav-item nav-link ' to='/movies'>
            Books
          </NavLink>
          <NavLink className='nav-item nav-link' to='/students'>
            Students
          </NavLink>

          <NavLink className='nav-item nav-link' to='/rentals'>
            Rental History
          </NavLink>
        </div>
        <div className='sideEndLogin'>
          {!user && (
            <React.Fragment>
              <NavLink className='nav-item nav-link' to='/login'>
                <button
                  className='btn btn-outline-light my-2 my-sm-0'
                  type='button'
                >
                  Login
                </button>
              </NavLink>
              {/* <NavLink className='nav-item nav-link' to='/register'>
                Register
              </NavLink> */}
            </React.Fragment>
          )}
          {user && (
            <React.Fragment>
              <NavLink className='nav-item nav-link' to='/profile'>
                {user.name}
              </NavLink>
              <NavLink className='nav-item nav-link' to='/logout'>
                LogOut
              </NavLink>
            </React.Fragment>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
