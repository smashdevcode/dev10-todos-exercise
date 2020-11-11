import React, { useState, useEffect } from 'react';

import ToDo from './ToDo';
import AddToDoHooks from './AddToDoHooks';
import EditToDoHooks from './EditToDoHooks';

function ToDosHooks() {
  const [toDos, setToDos] = useState([]);
  const [mode, setMode] = useState('Add');
  const [editToDoId, setEditToDoId] = useState(0);

  const getToDos = async () => {
    const response = await fetch('http://localhost:8080/api/todos');
    const data = await response.json();
    setToDos(data);
    setMode('Add');
    setEditToDoId(0);
  };

  const editToDo = async (toDoId) => {
    setEditToDoId(toDoId);
    setMode('Edit');
  };

  const deleteToDo = async (toDoId) => {
    const response = await fetch(`http://localhost:8080/api/todos/${toDoId}`, {
      method: 'DELETE',
    });
    if (response.status === 204) {
      getToDos();
    } else {
      throw new Error(`Unexpected response: ${response}`);
    }
  };

  useEffect(() => {
    getToDos();
  }, []);

  return (
    <>
      <h2 className="my-3">ToDos</h2>

      {mode === 'Add' && (
        <AddToDoHooks getToDos={getToDos} />
      )}

      {mode === 'Edit' && (
        <EditToDoHooks editToDoId={editToDoId} getToDos={getToDos} />
      )}

      <table className="table table-dark table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">ToDo Description</th>
            <th scope="col">&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {toDos.map((toDo) => (
            <ToDo
              key={toDo.id}
              toDo={toDo}
              editToDo={editToDo}
              deleteToDo={deleteToDo}
            />
          ))}
        </tbody>
      </table>
    </>
  );
}

export default ToDosHooks;
