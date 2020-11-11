import React, { useState, useEffect } from 'react';

import ToDo from './components/ToDo';
import Errors from './components/Errors';

export default function ToDosHooks() {
  const [toDos, setToDos] = useState([]);
  const [id, setId] = useState(0);
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState([]);
  const [mode, setMode] = useState('Add');

  const getToDos = () => {
    fetch('http://localhost:8080/api/todos')
      .then(response => response.json())
      .then(data => {
        setToDos(data);
        setId(0);
        setDescription('');
        setErrors([]);
        setMode('Add');
      });
  };

  // This effect will only get called once when the component is initially rendered
  // (this is the equivalent of componentDidMount() in a class component)
  useEffect(() => {
    getToDos();
  }, []);

  // // This effect will get called every time "id" or "mode" are changed
  // useEffect(() => {
  //   // TODO do something with "id" or "mode"
  // }, [id, mode]);

  const addSubmitHandler = (event) => {
    event.preventDefault();

    fetch('http://localhost:8080/api/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        description
      })
    })
    .then(response => {
        if (response.status === 201) {
            console.log('Success!');
            response.json().then(data => console.log(data));
            getToDos();
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
            getToDos();
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
    setId(0);
    setDescription('');
    setErrors([]);
    setMode('Add');
  };

  const editToDoHandler = (toDoId) => {
    // GET http://localhost:8080/api/todos/1 HTTP/1.1
    fetch(`http://localhost:8080/api/todos/${toDoId}`)
      .then(response => response.json())
      .then(({ id, description }) => {
        setId(id);
        setDescription(description);
        setMode('Edit');
      });
  };

  const deleteToDoHandler = (toDoId) => {
    // DELETE http://localhost:8080/api/todos/1 HTTP/1.1
    fetch(`http://localhost:8080/api/todos/${toDoId}`, {
      method: 'DELETE'
    })
    .then(response => {
      if (response.status === 204) {
        console.log('Success!');
        getToDos();
      } else {
        console.log('Delete failed for some reason: ' + response);
      }
    });
  };

  return (
    <>
      <h2>ToDos</h2>

      <Errors errors={errors} />

      {mode === 'Add' && (
        <form className="form-inline m-3" onSubmit={addSubmitHandler}>
          <div className="form-group col-6">
            <input className="form-control col-12" value={description} 
              onChange={(event) => setDescription(event.target.value)} type="text" placeholder="Please provide a description..." />
          </div>
          <button className="btn btn-success ml-1" type="submit">Add ToDo</button>
        </form>
      )}

      {mode === 'Edit' && (
        <form className="form-inline m-3" onSubmit={editSubmitHandler}>
          <div className="form-group col-6">
          <input className="form-control col-12" value={description} 
              onChange={(event) => setDescription(event.target.value)} type="text" placeholder="Please provide a description..." />
          </div>
          <button className="btn btn-success ml-1" type="submit">Update ToDo</button>
          <button className="btn btn-warning ml-1" onClick={cancelEditToDo} type="button">Cancel</button>
        </form>
      )}

      <table className="table table-dark table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">ToDo Description</th>
            <th scope="col">&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {toDos.map(toDo => (
            <ToDo key={toDo.id} 
              toDo={toDo} 
              editToDo={editToDoHandler} 
              deleteToDo={deleteToDoHandler} />
          ))}
        </tbody>
      </table>
    </>
  );
}
