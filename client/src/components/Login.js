import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';

import AuthContext from './AuthContext';
import Errors from './Errors';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const auth = useContext(AuthContext);
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // TODO Call API to authenticate and get token.
    const token = "notatoken";

    auth.login(token);

    history.push('/');
  };

  return (
    <div>
      <h2>Login</h2>
      <Errors errors={errors} />
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input type="text" onChange={(event) => setUsername(event.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" onChange={(event) => setPassword(event.target.value)} />
        </div>
        <div>
          <button type="submit">Login</button>
          <Link to="/register">I don't have an account</Link>
        </div>
      </form>
    </div>
  );
}
