import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import Errors from './Errors';

export default function EditToDo() {
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState([]);

  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    // GET http://localhost:8080/api/todos/1 HTTP/1.1
    fetch(`http://localhost:8080/api/todos/${id}`)
      .then(response => response.json())
      .then(({ description }) => {
        setDescription(description);
      });
  }, [id]);

  const editSubmitHandler = (event) => {
    event.preventDefault();

    // PUT http://localhost:8080/api/todos/1 HTTP/1.1
    // Content-Type: application/json
    
    // {
    //     "id": 1,
    //     "description": "Updated todo."
    // }
    
    fetch(`http://localhost:8080/api/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id,
        description
      })
    })
    .then(response => {
        if (response.status === 204) {
            console.log('Success!');
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

  const cancelEditToDo = () => {
    setDescription('');
    setErrors([]);
    history.push('/');
  };

  return (
    <>
      <Errors errors={errors} />
      <form className="form-inline m-3" onSubmit={editSubmitHandler}>
        <div className="form-group col-6">
        <input className="form-control col-12" value={description} 
            onChange={(event) => setDescription(event.target.value)} type="text" placeholder="Please provide a description..." />
        </div>
        <button className="btn btn-success ml-1" type="submit">Update ToDo</button>
        <button className="btn btn-warning ml-1" onClick={cancelEditToDo} type="button">Cancel</button>
      </form>
    </>
  );
}
