import React, { useState } from "react";
import { NavLink } from "react-router-dom";
const NavBar = ({ user }) => {
  const [collapse, SetCollapse] = useState(false);
  const handleCollapse = () => {
    SetCollapse(!collapse);
  };
  return (
    <nav className='navbar navbar-expand-lg navbar-light navContainer'>
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
        <span
          onClick={() => handleCollapse()}
          class='navbar-toggler-icon'
        ></span>
      </button>

      <div
        className={
          collapse == true ? "collapse navbar-collapse" : "navbar-collapse"
        }
        id='navbarSupportedContent'
      >
        <div className='navbar-nav mr-auto'>
          <NavLink className='nav-item nav-link ' to='/'>
            Books
          </NavLink>
          <NavLink className='nav-item nav-link' to='/students'>
            Students
          </NavLink>

          <NavLink className='nav-item nav-link' to='/rentals'>
            Rental History
          </NavLink>
          {!user && (
            <React.Fragment>
              <NavLink className='nav-item nav-link' to='/login'>
                Login
              </NavLink>
              <NavLink className='nav-item nav-link' to='/register'>
                Register
              </NavLink>
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
          {/* <NavLink className='nav-item nav-link' to='/dynamicForm'>
            Dynamic Form
          </NavLink> */}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
