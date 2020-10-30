import React from 'react';
import Errors from './Errors';

class AddToDo extends React.Component {
  constructor() {
    super();
    this.state = {
      description: '',
      errors: [],
    };
  }

  changeHandler = (event) => {
    this.setState({
      description: event.target.value,
    });
  }

  addSubmitHandler = async (event) => {
    event.preventDefault();

    const { getToDos } = this.props;

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
      getToDos();
    } else if (response.status === 400) {
      const data = await response.json();
      this.setState({
        errors: data,
      });
    } else {
      throw new Error(`Unexpected response: ${response}`);
    }
  }

  render() {
    const {
      description,
      errors,
    } = this.state;

    return (
      <>
        <Errors errors={errors} />
        <form className="form-inline p-3" onSubmit={this.addSubmitHandler}>
          <div className="form-group col-6">
            <input className="form-control col-12" value={description} onChange={this.changeHandler} placeholder="Enter a description..." type="text" />
          </div>
          <button className="btn btn-success ml-2" type="submit">Add ToDo</button>
        </form>
      </>
    );
  }
}

export default AddToDo;
