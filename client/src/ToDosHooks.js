import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import ToDo from './components/ToDo';

export default function ToDosHooks() {
  const [toDos, setToDos] = useState([]);

  const history = useHistory();

  const getToDos = () => {
    fetch('http://localhost:8080/api/todos')
      .then(response => response.json())
      .then(data => {
        setToDos(data);
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

      <div>
        <button className="btn btn-success m-3" onClick={() => history.push('/add')}>Add ToDo</button>
      </div>

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
              deleteToDo={deleteToDoHandler} />
          ))}
        </tbody>
      </table>
    </>
  );
}
