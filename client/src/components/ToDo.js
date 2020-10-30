import React from 'react';

export default function ToDo({ toDo, editToDo, deleteToDo }) {
  return (
    <tr>
      <td>{toDo.description}</td>
      <td>
        <div className="float-right">
          <button className="btn btn-sm btn-primary mr-2" type="button" onClick={() => editToDo(toDo.id)}>Edit</button>
          <button className="btn btn-sm btn-danger" type="button" onClick={() => deleteToDo(toDo.id)}>Delete</button>
        </div>
      </td>
    </tr>
  );
}
