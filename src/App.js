import React, { Component } from "react";
// import NavBar from "./components/navbar";
// import Counters from "./components/counters";
import { Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Movies from "./components/movies";
import Rentals from "./components/rentals";
import Customers from "./components/customers";
import NotFound from "./components/notFound";
import NavBar from "./components/navBar";
import MovieForm from "./components/movieForm";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import DynamicForm from "./components/dynamicForm";
import Logout from "./components/logout";
import auth from "./services/authService";

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
          {/* <Route path='/movies/new' component={AddMoviesForm} /> */}
          <Route path='/dynamicForm' component={DynamicForm} />

          <Route path='/register' component={RegisterForm} />
          <Route path='/login' component={LoginForm} />
          <Route path='/logout' component={Logout} />
          <Route path='/movies/:id' component={MovieForm} />
          <Route
            path='/movies'
            render={(props) => <Movies {...props} user={this.state.user} />}
          ></Route>
          <Route path='/customers' component={Customers}></Route>
          <Route path='/rentals' component={Rentals}></Route>
          <Route path='/not-found' component={NotFound}></Route>
          <Redirect from='/' exact to='/movies' />
        </Switch>
        {/* <Movies /> */}
      </>
    );
  }
}

export default App;
