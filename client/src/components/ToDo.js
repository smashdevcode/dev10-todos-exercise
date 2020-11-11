
export default function ToDo({ toDo, editToDo, deleteToDo }) {
  return (
    <tr>
        <td>{toDo.description}</td>
        <td>
        <div className="float-right">
            <button className="btn btn-primary btn-sm mr-2" type="button" 
              onClick={() => editToDo(toDo.id)}>Edit</button>
            <button className="btn btn-danger btn-sm" type="button" 
              onClick={() => deleteToDo(toDo.id)}>Delete</button>
        </div>
        </td>
    </tr>
  );
}
