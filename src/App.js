import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import ProductDetails from "./component/productDetails";
import Dashboard from "./component/admin/dashboard";

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/pd'>Product Details</Link>
            </li>
            <li>
              <Link to='/about'>About</Link>
            </li>
            <li>
              <Link to='/users'>Users</Link>
            </li>
            <li>
              <Link to='/admin'>Admin</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path='/about'>
            <About />
          </Route>
          <Route path='/admin'>
            <Dashboard />
          </Route>
          <Route path='/users' render={() => <Users sortBy='newest' />}>
            {/* <Users /> */}
          </Route>
          <Route
            path='/pd/:id?'
            render={(props) => <ProductDetails sortBy='newest' {...props} />}
          ></Route>
          <Route path='/not-found'>
            <NotFound />
          </Route>
          <Route path='/' exact>
            <Home />
          </Route>
          <Redirect to='/not-found' />
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return <h2>HOMEß</h2>;
}

function About(props) {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}

function NotFound() {
  return <h2>Not Found</h2>;
}
