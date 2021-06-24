import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Movies from "./components/movies";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import NavBar from "./components/navBar";

import "./App.css";

class App extends Component {
  render() {
    return (
      <>
        <NavBar />
        <main className='container'>
          <Switch>
            <Route path='/movies' component={Movies}></Route>
            <Route path='/customers' component={Customers}></Route>
            <Route path='/rentals' component={Rentals}></Route>
            <Route path='/notfound' component={NotFound}></Route>
            <Redirect exact from='/' to='/Movies' />
            <Redirect to='/notFound' />
          </Switch>
        </main>
      </>
    );
  }
}

export default App;
