import React from "react";
import { NavLink } from "react-router-dom";
const NavBar = ({ user }) => {
  return (
    <nav className='navbar navbar-expand-lg navbar-light navContainer'>
      <NavLink className='navbar-brand navHeading' to='#'>
        Library Management System
      </NavLink>
      <div className='' id='navbarNavAltMarkup'>
        <div className='navbar-nav'>
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
