import React from 'react';

class ToDos extends React.Component {
  constructor() {
    super();
    this.state = {
      toDos: [],
      id: 0,
      description: '',
      errors: [],
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
            errors: [],
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
            response.json().then(data => {
              console.log(data);
              this.setState({
                errors: data
              });
            });
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
  // DONE use "mode" to control form visibility
  // DONE display errors

  // Bootstrap

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
            response.json().then(data => {
              console.log(data);
              this.setState({
                errors: data
              });
            });
        } else {
            console.log('Oops... not sure what happened here :(');
        }
    });
  }

  cancelEditToDo = () => {
    this.setState({
      id: 0,
      description: '',
      errors: [],
      mode: 'Add'
    });
  }

  render() {
    const {
      errors,
      mode
    } = this.state;
    // const errors = this.state.errors;
    // const mode = this.state.mode;

    return (
      <>
        <h2>ToDos</h2>

        {errors.length > 0 && (
          <div className="alert alert-danger" role="alert">
            <p>The following errors occurred:</p>
            {errors.map(error => (
              <p key={error}>{error}</p>
            ))}
          </div>
        )}

        {mode === 'Add' && (
          <form className="form-inline m-3" onSubmit={this.addSubmitHandler}>
            <div className="form-group col-6">
              <input className="form-control col-12" value={this.state.description} 
                onChange={this.changeHandler} type="text" placeholder="Please provide a description..." />
            </div>
            <button className="btn btn-success ml-1" type="submit">Add ToDo</button>
          </form>
        )}

        {mode === 'Edit' && (
          <form className="form-inline m-3" onSubmit={this.editSubmitHandler}>
            <div className="form-group col-6">
              <input className="form-control col-12" value={this.state.description} 
                onChange={this.changeHandler} type="text" placeholder="Please provide a description..." />
            </div>
            <button className="btn btn-success ml-1" type="submit">Update ToDo</button>
            <button className="btn btn-warning ml-1" onClick={this.cancelEditToDo} type="button">Cancel</button>
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
            {this.state.toDos.map(toDo => (
              <tr key={toDo.id}>
                <td>{toDo.description}</td>
                <td>
                  <div className="float-right">
                    <button className="btn btn-primary btn-sm mr-2" type="button" onClick={() => this.editToDoHandler(toDo.id)}>Edit</button>
                    <button className="btn btn-danger btn-sm" type="button" onClick={() => this.deleteToDoHandler(toDo.id)}>Delete</button>
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
