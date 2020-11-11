import React from 'react';

import ToDo from './components/ToDo';
import Errors from './components/Errors';

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

        <Errors errors={errors} />

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
              <ToDo key={toDo.id} 
                toDo={toDo} 
                editToDo={this.editToDoHandler} 
                deleteToDo={this.deleteToDoHandler} />
            ))}
          </tbody>
        </table>
      </>
    );
  }
}

export default ToDos;
