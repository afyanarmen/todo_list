import React from 'react';

const TodoList = ({todos, deleteClickHandler, checkToggler}) => todos.map((todo, idx)=>{
  if (todo) {
    return (
    <div key={JSON.stringify(todo)}>
      <input
        onClick={(e) => checkToggler(e, !!deleteClickHandler)}
        id={deleteClickHandler ? idx : todo.originalIndex }
        type="radio"
        defaultChecked={!!deleteClickHandler}
      />
      {`${todo.time} - ${todo.text}`}
      {deleteClickHandler && <button onClick={() => deleteClickHandler(idx)}>X</button>}
      <br/>
    </div>);
  }
  return null;
});

export default TodoList;