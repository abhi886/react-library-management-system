import React, { Component } from "react";
// import NavBar from "./components/navbar";
// import Counters from "./components/counters";
import { Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Movies from "./components/movies";
import Rentals from "./components/rentals";
import Students from "./components/students";
import NotFound from "./components/notFound";
import NavBar from "./components/navbar";
import MovieForm from "./components/movieForm";
import StudentForm from "./components/studentForm";

import GenresForm from "./components/genreForm";
import FacultyForm from "./components/facultyForm";

import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
// import DynamicForm from "./components/dynamicForm";
import Logout from "./components/logout";
import auth from "./services/authService";
import ProtectedRoute from "./components/common/protectedRoute";

// import AddMoviesForm from "./components/newMovie";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
  // state = {
  //   counters: [
  //     { id: 1, value: 4 },
  //     { id: 2, value: 0 },
  //     { id: 3, value: 0 },
  //     { id: 4, value: 0 },
  //   ],
  // };

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
    console.log("App-Renderd");
    return (
      <>
        <ToastContainer />
        {/* <NavBar totalCounters={this.state.counters.filter(c => c.value > 0).length} />
    <main className="container">
      <Counters 
      counters={this.state.counters}
      onReset={this.handleReset} 
      onIncrement={this.handleIncrement}
      onSet1={this.handleSet1}
      onDelete={this.handleDelete}
      onDecrement={this.handleDecrement}
       />
    </main> */}
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

          <ProtectedRoute path='/genres/:id' component={GenresForm} />
          <ProtectedRoute path='/faculties/:id' component={FacultyForm} />

          <Route path='/rentals/:id' component={Rentals}></Route>
          <Route path='/not-found' component={NotFound}></Route>
          <Redirect from='/' exact to='/movies' />
        </Switch>
        {/* <Movies /> */}
      </>
    );
  }
}

export default App;
