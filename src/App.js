import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Movies from "components/pages/movies";
import Rentals from "components/pages/rentals";
import ReturnRentals from "components/returnRentals";
import Students from "components/pages/students";
import NotFound from "components/notFound";
import NavBar from "components/navbar";
import MovieForm from "components/forms/movieForm";
import StudentForm from "components/forms/studentForm";
import GenresForm from "components/forms/genreForm";
import FacultyForm from "components/forms/facultyForm";
import LoginForm from "components/forms/loginForm";
import RegisterForm from "components/forms/registerForm";
import Logout from "components/logout";
import auth from "services/authService";
import ProtectedRoute from "components/common/protectedRoute";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Hires from "components/pages/hires";
import RenameBookGenre from "components/renameBookGenre";
import LandingPage from "components/pages/landingPage";
import { tracker } from "components/common/idleTimer";
import { logout } from "services/authService";
import { useLocation } from "react-router-dom";

export default function App() {
  const [user, SetUser] = useState("");
  const [isTimeout, SetIsTimeout] = useState(false);
  const location = useLocation();
  useEffect(() => {
    const user = auth.getCurrentUser();
    SetUser(user);
  }, [isTimeout]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    let intervalId;
    if (token && !isTimeout) {
      tracker("add");
      intervalId = setInterval(() => {
        const expiredTime = parseInt(localStorage.getItem("TTL") || 0, 10);
        if (expiredTime < Date.now()) {
          tracker("remove");
          SetIsTimeout((isTimeOut) => !isTimeOut);
          logout();
        }
      }, 1000);
    }
    return () => {
      clearInterval(intervalId);
      tracker("remove");
    };
  }, [isTimeout]);
  return (
    <>
      <ToastContainer />
      <NavBar location={location} user={user} />
      <Switch>
        <Route path='/register' component={RegisterForm} />
        <Route path='/login' component={LoginForm} />
        <Route path='/logout' component={Logout} />
        <ProtectedRoute path='/books/:id' component={MovieForm} />
        <Route
          path='/books'
          render={(props) => <Movies {...props} user={user} />}
        ></Route>
        <ProtectedRoute path='/students/:id' component={StudentForm} />
        <Route
          path='/students'
          render={(props) => <Students {...props} user={user} />}
        ></Route>
        <ProtectedRoute exact path='/genres/:id' component={GenresForm} />
        <ProtectedRoute
          path='/genres/renameGenre/:id'
          component={RenameBookGenre}
        />
        <ProtectedRoute path='/faculties/:id' component={FacultyForm} />
        <ProtectedRoute path='/rentals' exact component={Rentals} />
        <ProtectedRoute path='/rentals/return/:id' component={ReturnRentals} />
        <Route path='/hires/:id' component={Hires}></Route>
        <Route path='/not-found' component={NotFound}></Route>
        <Route from='/' component={LandingPage} />
      </Switch>{" "}
    </>
  );
}
