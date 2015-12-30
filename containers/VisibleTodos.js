import { connect } from 'react-redux'
import toggleTodo from '../actions/toggle-todo'
import TodoList from '../components/TodoList'
import * as C from '../constants'

const getVisibleTodos = (
  todos,
  filter
) => {
  switch (filter) {
    case C.SHOW_ALL:
      return todos
    case C.SHOW_ACTIVE:
      return todos.filter(t => !t.completed)
    case C.SHOW_COMPLETED:
      return todos.filter(t => t.completed)
  }
}

const mapStateToProps = (
  state
) => {
  return {
    todos: getVisibleTodos(
      state.todos,
      state.visibilityFilter
    )
  }
}

const mapDispatchToProps = (
  dispatch
) => {
  return {
    onTodoClick: (id) => {
      dispatch(toggleTodo(id))
    }
  }
}

const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)

export default VisibleTodoList

