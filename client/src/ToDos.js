import React from 'react';

class ToDos extends React.Component {
  constructor() {
    super();
    this.state = {
      toDos: [],
      description: '',
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
          console.log('Success!');
          response.json().then((data) => console.log(data));
          this.getToDos();
        } else if (response.status === 400) {
          console.log('Errors!');
          response.json().then((data) => console.log(data));
        } else {
          console.log('Oops... not sure what happened here :(');
        }
      });
  }

  render() {
    const {
      toDos,
      description,
    } = this.state;

    return (
      <>
        <h2>ToDos</h2>
        <form onSubmit={this.submitHandler}>
          <input value={description} onChange={this.changeHandler} type="text" />
          <button type="submit">Add ToDo</button>
        </form>
        <ul>
          {toDos.map((toDo) => (
            <li key={toDo.id}>{toDo.description}</li>
          ))}
        </ul>
      </>
    );
  }
}

export default ToDos;
