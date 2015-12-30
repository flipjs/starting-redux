import React from 'react'
import List from 'material-ui/lib/lists/list'
import Todo from './Todo'

const TodoList = ({
  todos,
  onTodoClick
}) => {
  return (
    <List>
      {
        todos.map(todo =>
          <Todo
            key={ todo.id }
            { ...todo }
            onClick={ () => onTodoClick(todo.id) }
          />
        )
      }
    </List>
  )
}

export default TodoList

