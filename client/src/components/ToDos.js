import React from 'react';
import ToDo from './ToDo';
import AddToDo from './AddToDo';
import EditToDo from './EditToDo';

class ToDos extends React.Component {
  constructor() {
    super();
    this.state = {
      toDos: [],
      mode: 'Add',
      editToDoId: 0,
    };
  }

  componentDidMount() {
    this.getToDos();
  }

  getToDos = async () => {
    const response = await fetch('http://localhost:8080/api/todos');
    const data = await response.json();
    this.setState({
      toDos: data,
      mode: 'Add',
      editToDoId: 0,
    });
  }

  editToDo = async (toDoId) => {
    this.setState({
      editToDoId: toDoId,
      mode: 'Edit',
    });
  }

  deleteToDo = async (toDoId) => {
    const response = await fetch(`http://localhost:8080/api/todos/${toDoId}`, {
      method: 'DELETE',
    });
    if (response.status === 204) {
      this.getToDos();
    } else {
      throw new Error(`Unexpected response: ${response}`);
    }
  }

  render() {
    const {
      toDos,
      mode,
      editToDoId,
    } = this.state;

    return (
      <>
        <h2 className="my-3">ToDos</h2>

        {mode === 'Add' && (
          <AddToDo getToDos={this.getToDos} />
        )}

        {mode === 'Edit' && (
          <EditToDo editToDoId={editToDoId} getToDos={this.getToDos} />
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
                editToDo={this.editToDo}
                deleteToDo={this.deleteToDo}
              />
            ))}
          </tbody>
        </table>
      </>
    );
  }
}

export default ToDos;
