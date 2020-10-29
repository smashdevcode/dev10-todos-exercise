import React from 'react';

class ToDos extends React.Component {
  constructor() {
    super();
    this.state = {
      toDos: []
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

  // TODO Add change event handler for the description input element

  // TODO Add submit event handler for the form
  // TODO Use Fetch to make a POST
  // TODO On success, use Fetch to get the list of ToDos

  render() {
    return (
      <>
        <h2>ToDos</h2>
        {/* TODO Add form element with a single input element and button */}
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
