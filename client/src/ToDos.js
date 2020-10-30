import React from 'react';

class ToDos extends React.Component {
  constructor() {
    super();
    this.state = {
      toDos: [],
      id: 0,
      description: '',
      errors: [],
      mode: 'Add',
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
    });
  }

  changeHandler = (event) => {
    this.setState({
      description: event.target.value,
    });
  }

  addSubmitHandler = async (event) => {
    event.preventDefault();

    const {
      description,
    } = this.state;

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
      this.setState({
        description: '',
        errors: [],
      });
      this.getToDos();
    } else if (response.status === 400) {
      const data = await response.json();
      this.setState({
        errors: data,
      });
    } else {
      throw new Error(`Unexpected response: ${response}`);
    }
  }

  editSubmitHandler = async (event) => {
    event.preventDefault();

    const {
      id,
      description,
    } = this.state;

    const response = await fetch(`http://localhost:8080/api/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
        description,
      }),
    });

    if (response.status === 204) {
      this.setState({
        id: 0,
        description: '',
        errors: [],
        mode: 'Add',
      });
      this.getToDos();
    } else if (response.status === 400) {
      const data = await response.json();
      this.setState({
        errors: data,
      });
    } else {
      throw new Error(`Unexpected response: ${response}`);
    }
  }

  editToDo = async (toDoId) => {
    const response = await fetch(`http://localhost:8080/api/todos/${toDoId}`);
    const { id, description } = await response.json();
    this.setState({
      id,
      description,
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
      description,
      errors,
      mode,
    } = this.state;

    return (
      <>
        <h2 className="my-3">ToDos</h2>

        {errors.length > 0 && (
          <div className="alert alert-danger" role="alert">
            <p>The following errors occurred:</p>
            {errors.map((error) => (
              <p key={error}>{error}</p>
            ))}
          </div>
        )}

        {mode === 'Add' && (
          <form className="form-inline p-3" onSubmit={this.addSubmitHandler}>
            <div className="form-group col-6">
              <input className="form-control col-12" value={description} onChange={this.changeHandler} placeholder="Enter a description..." type="text" />
            </div>
            <button className="btn btn-success ml-2" type="submit">Add ToDo</button>
          </form>
        )}

        {mode === 'Edit' && (
          <form className="form-inline p-3" onSubmit={this.editSubmitHandler}>
            <div className="form-group col-6">
              <input className="form-control col-12" value={description} onChange={this.changeHandler} placeholder="Enter a description..." type="text" />
            </div>
            <button className="btn btn-success ml-2" type="submit">Update ToDo</button>
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
            {toDos.map((toDo) => (
              <tr key={toDo.id}>
                <td>{toDo.description}</td>
                <td>
                  <div className="float-right">
                    <button className="btn btn-sm btn-primary mr-2" type="button" onClick={() => this.editToDo(toDo.id)}>Edit</button>
                    <button className="btn btn-sm btn-danger" type="button" onClick={() => this.deleteToDo(toDo.id)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  }
}

export default ToDos;
