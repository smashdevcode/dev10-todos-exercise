import React from 'react';

class ToDos extends React.Component {
  constructor() {
    super();
    this.state = {
      toDos: [],
      description: ''
    };
  }

  componentDidMount() {
    fetch('http://localhost:8080/api/todos')
        .then(response => response.json())
        .then(data => {
          this.setState({
            toDos: data
          });
        });
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

            fetch('http://localhost:8080/api/todos')
            .then(response => response.json())
            .then(data => {
              console.log(data);
              this.setState({
                toDos: data
              });
            });    
        } else if (response.status === 400) {
            console.log('Errors!');
            response.json().then(data => console.log(data));
        } else {
            console.log('Oops... not sure what happened here :(');
        }
    });
  }

  // TODO Add submit event handler for the form
  // TODO Use Fetch to make a POST
  // TODO On success, use Fetch to get the list of ToDos

  render() {
    return (
      <>
        <h2>ToDos</h2>
        {/* TODO Add form element with a single input element and button */}
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
