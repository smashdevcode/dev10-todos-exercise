import React from 'react';

class ToDos extends React.Component {
  constructor() {
    super();
    this.state = {
      toDos: [],
      id: 0,
      description: '',
      mode: 'Add' // Add, Edit
    };
  }

  getToDos = () => {
    fetch('http://localhost:8080/api/todos')
        .then(response => response.json())
        .then(data => {
          this.setState({
            toDos: data,
            id: 0,
            description: '',
            mode: 'Add'
          });
        });
  }

  componentDidMount() {
    this.getToDos();
  }

  changeHandler = (event) => {
    this.setState({
      description: event.target.value
    });
  }

  addSubmitHandler = (event) => {
    event.preventDefault();

    fetch('http://localhost:8080/api/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        description: this.state.description
      })
    })
    .then(response => {
        if (response.status === 201) {
            console.log('Success!');
            response.json().then(data => console.log(data));
            this.getToDos();
        } else if (response.status === 400) {
            console.log('Errors!');
            response.json().then(data => console.log(data));
        } else {
            console.log('Oops... not sure what happened here :(');
        }
    });
  }

  deleteToDoHandler = (toDoId) => {
    console.log('Delete todo... ' + toDoId);

    // DELETE http://localhost:8080/api/todos/1 HTTP/1.1
    fetch(`http://localhost:8080/api/todos/${toDoId}`, {
      method: 'DELETE'
    })
    .then(response => {
      if (response.status === 204) {
        console.log('Success!');
        this.getToDos();
      } else {
        console.log('Delete failed for some reason: ' + response);
      }
    });
  }

  // DONE add "edit" button
  // DONE stub out the handler method
  // DONE fetch the todo and update state
  // DONE add the form
  // DONE add the form submit handler
  // DONE reset the state

  // TODO use "mode" to control form visibility
  // TODO display errors

  editToDoHandler = (toDoId) => {
    console.log('Edit todo... ' + toDoId);

    // GET http://localhost:8080/api/todos/1 HTTP/1.1
    fetch(`http://localhost:8080/api/todos/${toDoId}`)
      .then(response => response.json())
      .then(data => {
        this.setState({
          id: data.id,
          description: data.description,
          mode: 'Edit'
        });
      });
      // you can optionally use destructuring...
      // .then(({ id, description }) => {
      //   this.setState({
      //     id,
      //     description
      //   });
      // });
  }

  editSubmitHandler = (event) => {
    event.preventDefault();

    // const id = this.state.id;
    // const description = this.state.description;

    const { id, description } = this.state;

    // PUT http://localhost:8080/api/todos/1 HTTP/1.1
    // Content-Type: application/json
    
    // {
    //     "id": 1,
    //     "description": "Updated todo."
    // }
    
    fetch(`http://localhost:8080/api/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id,
        description
      })
    })
    .then(response => {
        if (response.status === 204) {
            console.log('Success!');
            this.getToDos();
        } else if (response.status === 400) {
            console.log('Errors!');
            response.json().then(data => console.log(data));
        } else {
            console.log('Oops... not sure what happened here :(');
        }
    });
  }

  render() {
    const { mode } = this.state;
    // const mode = this.state.mode;

    return (
      <>
        <h2>ToDos</h2>

        {mode === 'Add' && (
          <form onSubmit={this.addSubmitHandler}>
            <input value={this.state.description} onChange={this.changeHandler} type="text" />
            <button type="submit">Add ToDo</button>
          </form>
        )}

        {mode === 'Edit' && (
          <form onSubmit={this.editSubmitHandler}>
            <input value={this.state.description} onChange={this.changeHandler} type="text" />
            <button type="submit">Update ToDo</button>
          </form>
        )}

        <ul>
          {this.state.toDos.map(toDo => (
            <li key={toDo.id}>
              {toDo.description}
              <button type="button" onClick={() => this.editToDoHandler(toDo.id)}>Edit</button>
              <button type="button" onClick={() => this.deleteToDoHandler(toDo.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </>
    );
  }
}

export default ToDos;
