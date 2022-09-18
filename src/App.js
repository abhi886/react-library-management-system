import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
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
import "./cssUpdates.css";
import Hires from "./components/hires";
import RenameBookGenre from "./components/renameBookGenre";
import LandingPage from "./components/landingPage";

class App extends Component {
  state = {};

  constructor() {
    super();
    console.log("App - Constructor");
  }

  componentDidMount() {
    console.log(process.env.REACT_APP_API_URL);
    console.log("App = Mounted");
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  handleReset = () => {
    const counters = this.state.counters.map((c) => {
      c.value = 0;
      return c;
    });
    this.setState({ counters });
  };

  handleSet1 = () => {
    const counters = this.state.counters.map((c) => {
      c.value = 1;
      return c;
    });
    this.setState({ counters });
  };

  handleIncrement = (counter) => {
    const counters = [...this.state.counters];
    const index = counters.indexOf(counter);
    counters[index] = { ...counter };
    counters[index].value++;
    this.setState({ counters });
  };

  handleDecrement = (counter) => {
    const counters = [...this.state.counters];
    const index = counters.indexOf(counter);
    counters[index] = { ...counter };
    counters[index].value--;
    this.setState({ counters });
  };

  handleDelete = (counterId) => {
    const counters = this.state.counters.filter((c) => c.id !== counterId);
    this.setState({ counters });
  };

  render() {
    const { user } = this.state;
    return (
      <>
        <ToastContainer />
        <NavBar user={this.state.user} />
        <Switch>
          <Route path='/register' component={RegisterForm} />
          <Route path='/login' component={LoginForm} />
          <Route path='/logout' component={Logout} />
          <ProtectedRoute path='/movies/:id' component={MovieForm} />
          <Route
            path='/movies'
            render={(props) => <Movies {...props} user={this.state.user} />}
          ></Route>
          <ProtectedRoute path='/students/:id' component={StudentForm} />
          <Route
            path='/students'
            render={(props) => <Students {...props} user={this.state.user} />}
          ></Route>
          <ProtectedRoute exact path='/genres/:id' component={GenresForm} />
          <ProtectedRoute
            path='/genres/renameGenre/:id'
            component={RenameBookGenre}
          />

          <ProtectedRoute path='/faculties/:id' component={FacultyForm} />
          {/* <Route path='/rentals' exact component={Rentals}></Route> */}
          <ProtectedRoute path='/rentals' component={Rentals} />

          <Route path='/rentals/return/:id' component={ReturnRentals} />
          {/* <Route path='/rentals/:id' component={Rentals}></Route> */}
          <Route path='/hires/:id' component={Hires}></Route>
          <Route path='/not-found' component={NotFound}></Route>
          <Route from='/' component={LandingPage} />
        </Switch>
      </>
    );
  }
}

export default App;
