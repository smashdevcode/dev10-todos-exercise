import { useContext } from 'react';
import { Link } from 'react-router-dom';

import AuthContext from './AuthContext';

export default function NavBar() {
  const auth = useContext(AuthContext);

  return (
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
        {!auth.user && (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
      {auth.user && (
        <div>
          <p>Hello {auth.user.username}!</p>
          <button onClick={() => auth.logout()}>Logout</button>
        </div>
      )}
    </nav>
  );
}
