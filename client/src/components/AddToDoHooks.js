import React, { useState } from 'react';

import Errors from './Errors';

function AddToDoHooks({ getToDos }) {
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState([]);

  const addSubmitHandler = async (event) => {
    event.preventDefault();

    const response = await fetch('http://localhost:8080/api/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        description,
      }),
    });

    if (response.status === 201) {
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
      <form className="form-inline p-3" onSubmit={addSubmitHandler}>
        <div className="form-group col-6">
          <input className="form-control col-12" value={description} onChange={(event) => setDescription(event.target.value)} placeholder="Enter a description..." type="text" />
        </div>
        <button className="btn btn-success ml-2" type="submit">Add ToDo</button>
      </form>
    </>
  );
}

export default AddToDoHooks;
