import React, { useState } from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import NavBar from './components/NavBar';
import AddToDo from './components/AddToDo';
import EditToDo from './components/EditToDo';
import Login from './components/Login';
import ToDosHooks from './ToDosHooks';
import AuthContext from './components/AuthContext';

function About() {
  return <h1>About</h1>;
}

function Users() {
  return <h1>Users</h1>;
}

function NotFound() {
  return <h1>Not Found</h1>;
}

function App() {
  const [user, setUser] = useState(null);

  const login = (token) => {
    // TODO Parse the token to get user information.
    const user = {
      appUserId: 1,
      username: 'jamesc',
    };

    console.log(user);

    setUser(user);

    return user;
  };

  const logout = () => {
    setUser(null);
  };

  // Create the auth object
  const auth = {
    user,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={auth}>
      <Router>
        <div>
          <NavBar />
          <Switch>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/users">
              <Users />
            </Route>
            <Route path="/add">
              {user ? (
                <AddToDo />
              ) : (
                <Redirect to="/login" />
              )}
            </Route>
            <Route path="/edit/:id">
              {user ? (
                <EditToDo />
              ) : (
                <Redirect to="/login" />
              )}
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route exact path="/">
              <ToDosHooks />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
