import ToDosHooks from './ToDosHooks';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

import AddToDo from './components/AddToDo';
import EditToDo from './components/EditToDo';

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
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
            <li>
              <Link to="/add">Add ToDo</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/add">
            <AddToDo />
          </Route>
          <Route path="/edit/:id">
            <EditToDo />
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
  );
}

export default App;
