import React from 'react';
import moment from 'moment';
import TodoList from './components/todo_list';

class App extends React.Component {
  constructor(){
    super();
    this.inputRef = React.createRef();
    this.state = {
      todos: [],
      dones: []
    };
  }

  addClickHandler = () => {
    const todos = [...this.state.todos];
    todos.push({
      text: this.inputRef.current.value,
      originalIndex: todos.length,
      time: moment().format('DD MM YY, HH:mm:ss')
    });

    this.setState({todos}, ()=>{
      this.inputRef.current.value = '';
    });
  }

  deleteClickHandler = idx => {
    const dones = [...this.state.dones];
    delete dones[idx];
    this.setState({dones});
  }

  toggleChecked = (e, doneTodo) => {
    const dones = [...this.state.dones];
    const todos = [...this.state.todos];
    if (!doneTodo) {
      dones.push(todos[e.target.id]);
      delete todos[e.target.id];
    }
    else {
      const todo = dones[e.target.id];
      todos[todo.originalIndex] = todo;
      delete dones[e.target.id];
    }

    this.setState({dones, todos});
  }

  render() {
    return (
      <React.StrictMode>
        <div>
          <input ref={this.inputRef} placeholder="TODO" />
          <button onClick={this.addClickHandler}>Add</button>
          <h3>Done todos</h3>
          <TodoList todos={this.state.dones} checkToggler={this.toggleChecked} deleteClickHandler={this.deleteClickHandler} />
          <h3>All todos</h3>
          <TodoList todos={this.state.todos} checkToggler={this.toggleChecked} />
        </div>
      </React.StrictMode>
    );
  }
}

export default App;
