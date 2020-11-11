import React, { useState, useEffect } from 'react';

import Errors from './Errors';

function EditToDoHooks({ editToDoId, getToDos }) {
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const getToDo = async () => {
      const response = await fetch(`http://localhost:8080/api/todos/${editToDoId}`);
      const { description: toDoDescription } = await response.json();
      setDescription(toDoDescription);
    };
    getToDo();
  }, [editToDoId]);

  const editSubmitHandler = async (event) => {
    event.preventDefault();

    const response = await fetch(`http://localhost:8080/api/todos/${editToDoId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: editToDoId,
        description,
      }),
    });

    if (response.status === 204) {
      setDescription('');
      setErrors([]);
      getToDos();
    } else if (response.status === 400) {
      const data = await response.json();
      setErrors(data);
    } else {
      throw new Error(`Unexpected response: ${response}`);
    }
  };

  return (
    <>
      <Errors errors={errors} />
      <form className="form-inline p-3" onSubmit={editSubmitHandler}>
        <div className="form-group col-6">
          <input className="form-control col-12" value={description} onChange={(event) => setDescription(event.target.value)} placeholder="Enter a description..." type="text" />
        </div>
        <button className="btn btn-success ml-2" type="submit">Update ToDo</button>
      </form>
    </>
  );
}

export default EditToDoHooks;
