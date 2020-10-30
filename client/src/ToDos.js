import React from 'react';

class ToDos extends React.Component {
  constructor() {
    super();
    this.state = {
      toDos: [],
      description: '',
      errors: [],
    };
  }

  componentDidMount() {
    this.getToDos();
  }

  getToDos = () => {
    fetch('http://localhost:8080/api/todos')
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          toDos: data,
        });
      });
  }

  changeHandler = (event) => {
    this.setState({
      description: event.target.value,
    });
  }

  submitHandler = (event) => {
    event.preventDefault();

    const {
      description,
    } = this.state;

    fetch('http://localhost:8080/api/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        description,
      }),
    })
      .then((response) => {
        if (response.status === 201) {
          this.setState({
            description: '',
            errors: [],
          });
          this.getToDos();
        } else if (response.status === 400) {
          response.json().then((data) => this.setState({
            errors: data,
          }));
        } else {
          throw new Error(`Unexpected response: ${response}`);
        }
      });
  }

  deleteToDo = (toDoId) => {
    fetch(`http://localhost:8080/api/todos/${toDoId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.status === 204) {
          this.getToDos();
        } else {
          throw new Error(`Unexpected response: ${response}`);
        }
      });
  }

  render() {
    const {
      toDos,
      description,
      errors,
    } = this.state;

    return (
      <>
        <h2>ToDos</h2>
        <form onSubmit={this.submitHandler}>
          {errors.length > 0 && (
            <ul>
              {errors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          )}
          <input value={description} onChange={this.changeHandler} type="text" />
          <button type="submit">Add ToDo</button>
        </form>
        <ul>
          {toDos.map((toDo) => (
            <li key={toDo.id}>
              {toDo.description}
              <button type="button" onClick={() => this.deleteToDo(toDo.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </>
    );
  }
}

export default ToDos;
