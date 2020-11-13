import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import AuthContext from './AuthContext';
import Errors from './Errors';

export default function AddToDo() {
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState([]);

  const auth = useContext(AuthContext);
  const history = useHistory();

  const addSubmitHandler = (event) => {
    event.preventDefault();

    fetch('http://localhost:8080/api/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth.user.token}`
      },
      body: JSON.stringify({
        description
      })
    })
    .then(response => {
        if (response.status === 201) {
            console.log('Success!');
            response.json().then(data => console.log(data));
            history.push('/');
        } else if (response.status === 400) {
            console.log('Errors!');
            response.json().then(data => {
              console.log(data);
              setErrors(data);
            });
        } else {
            console.log('Oops... not sure what happened here :(');
        }
    });
  };

  return (
    <>
      <Errors errors={errors} />
      <form className="form-inline m-3" onSubmit={addSubmitHandler}>
        <div className="form-group col-6">
        <input className="form-control col-12" value={description} 
            onChange={(event) => setDescription(event.target.value)} type="text" placeholder="Please provide a description..." />
        </div>
        <button className="btn btn-success ml-1" type="submit">Add ToDo</button>
      </form>
    </>
  );
} 
