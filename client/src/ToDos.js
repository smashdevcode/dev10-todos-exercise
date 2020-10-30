import React from 'react';

class ToDos extends React.Component {
  constructor() {
    super();
    this.state = {
      toDos: [],
      description: ''
    };
  }

  getToDos = () => {
    fetch('http://localhost:8080/api/todos')
        .then(response => response.json())
        .then(data => {
          this.setState({
            toDos: data
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

  submitHandler = (event) => {
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

  render() {
    return (
      <>
        <h2>ToDos</h2>
        <form onSubmit={this.submitHandler}>
          <input value={this.state.description} onChange={this.changeHandler} type="text" />
          <button type="submit">Add ToDo</button>
        </form>
        <ul>
          {this.state.toDos.map(toDo => (
            <li key={toDo.id}>{toDo.description}</li>
          ))}
        </ul>
      </>
    );
  }
}

export default ToDos;
