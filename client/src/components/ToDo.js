import { Link } from 'react-router-dom';

export default function ToDo({ toDo, deleteToDo }) {
  return (
    <tr>
        <td>{toDo.description}</td>
        <td>
        <div className="float-right">
            <Link className="btn btn-primary btn-sm mr-2" to={`/edit/${toDo.id}`}>Edit</Link>
            <button className="btn btn-danger btn-sm" type="button" 
              onClick={() => deleteToDo(toDo.id)}>Delete</button>
        </div>
        </td>
    </tr>
  );
}
