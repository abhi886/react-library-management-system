import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Movies from "./components/movies";
import Rentals from "./components/rentals";
import ReturnRentals from "./components/returnRentals";

import Students from "./components/students";
import NotFound from "./components/notFound";
import NavBar from "./components/navbar";
import MovieForm from "./components/movieForm";
import StudentForm from "./components/studentForm";

import GenresForm from "./components/genreForm";
import FacultyForm from "./components/facultyForm";

import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import Logout from "./components/logout";
import auth from "./services/authService";
import ProtectedRoute from "./components/common/protectedRoute";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Hires from "./components/hires";
import RenameBookGenre from "./components/renameBookGenre";
import LandingPage from "./components/landingPage";
import { tracker } from "./components/common/idleTimer";
import { logout } from "./services/authService";

export default function App() {
  const [user, SetUser] = useState("");
  const [isTimeout, SetIsTimeout] = useState(false);
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
      <NavBar user={user} />
      <Switch>
        <Route path='/register' component={RegisterForm} />
        <Route path='/login' component={LoginForm} />
        <Route path='/logout' component={Logout} />
        <ProtectedRoute path='/movies/:id' component={MovieForm} />
        <Route
          path='/movies'
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
        <ProtectedRoute path='/rentals' component={Rentals} />
        <Route path='/rentals/return/:id' component={ReturnRentals} />
        <Route path='/hires/:id' component={Hires}></Route>
        <Route path='/not-found' component={NotFound}></Route>
        <Route from='/' component={LandingPage} />
      </Switch>{" "}
    </>
  );
}
