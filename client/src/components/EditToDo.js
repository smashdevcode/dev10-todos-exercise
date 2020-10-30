import React from 'react';
import Errors from './Errors';

class EditToDo extends React.Component {
  constructor() {
    super();
    this.state = {
      description: '',
      errors: [],
    };
  }

  componentDidMount() {
    this.getToDo();
  }

  componentDidUpdate(prevProps) {
    const { editToDoId } = this.props;

    if (editToDoId !== prevProps.editToDoId) {
      this.getToDo();
    }
  }

  getToDo = async () => {
    const { editToDoId } = this.props;
    const response = await fetch(`http://localhost:8080/api/todos/${editToDoId}`);
    const { description } = await response.json();
    this.setState({
      description,
    });
  }

  changeHandler = (event) => {
    this.setState({
      description: event.target.value,
    });
  }

  editSubmitHandler = async (event) => {
    event.preventDefault();

    const {
      editToDoId,
      getToDos,
    } = this.props;

    const {
      description,
    } = this.state;

    const response = await fetch(`http://localhost:8080/api/todos/${editToDoId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: editToDoId,
        description,
      }),
    });

    if (response.status === 204) {
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
        <form className="form-inline p-3" onSubmit={this.editSubmitHandler}>
          <div className="form-group col-6">
            <input className="form-control col-12" value={description} onChange={this.changeHandler} placeholder="Enter a description..." type="text" />
          </div>
          <button className="btn btn-success ml-2" type="submit">Update ToDo</button>
        </form>
      </>
    );
  }
}

export default EditToDo;
