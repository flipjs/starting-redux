import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers } from 'redux'
import { Provider, connect } from 'react-redux'
import RaisedButton from 'material-ui/lib/raised-button'
import FlatButton from 'material-ui/lib/flat-button'
import List from 'material-ui/lib/lists/list'
import ListItem from 'material-ui/lib/lists/list-item'
import Checkbox from 'material-ui/lib/checkbox'
import TextField from 'material-ui/lib/text-field'
import AppBar from 'material-ui/lib/app-bar'
import IconButton from 'material-ui/lib/icon-button'
import IconMenu from 'material-ui/lib/menus/icon-menu'
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert'
import MenuItem from 'material-ui/lib/menus/menu-item'

const ADD_TODO = 'ADD_TODO'
const TOGGLE_TODO = 'TOGGLE_TODO'
const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'

const SHOW_ALL = 'SHOW_ALL'
const SHOW_COMPLETED = 'SHOW_COMPLETED'
const SHOW_ACTIVE = 'SHOW_ACTIVE'

const todo = (state, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        id: action.id,
        text: action.text,
        completed: false
      }
    case TOGGLE_TODO:
      if (state.id !== action.id) {
        return state
      }

      return {
        ...state,
        completed: !state.completed
      }
    default:
      return state
  }
}

const todos = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        todo(undefined, action)
      ]
    case TOGGLE_TODO:
      return state.map(t => todo(t, action))
    default:
      return state
  }
}

const visibilityFilter = (state = SHOW_ALL, action) => {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter
    default:
      return state
  }
}

const todoApp = combineReducers({
  todos,
  visibilityFilter
})

const Link = ({
  active,
  children,
  onClick
}) => {
  const onLinkClick = (e) => {
    e.preventDefault()
    onClick()
  }

  const style = {
    backgroundColor: '#ccc'
  }

  return (
    <FlatButton
      style={ style }
      label={ children }
      secondary
      onClick={ onLinkClick }
      disabled={ active }
    />
  )
}

const mapStateToLinkProps = (
  state,
  ownProps
) => {
  return {
    active: ownProps.filter === state.visibilityFilter
  }
}
const mapDispatchToLinkProps = (
  dispatch,
  ownProps
) => {
  return {
    onClick: () => {
      dispatch({
        type: SET_VISIBILITY_FILTER,
        filter: ownProps.filter
      })
    }
  }
}
const FilterLink = connect(
  mapStateToLinkProps,
  mapDispatchToLinkProps
)(Link)

const Footer = () => {
  return (
    <p>
      <b>Filter:</b>
      {' '}
      <FilterLink filter={ SHOW_ALL }>
        All
      </FilterLink>
      {' '}
      <FilterLink filter={ SHOW_ACTIVE }>
        Active
      </FilterLink>
      {' '}
      <FilterLink filter={ SHOW_COMPLETED }>
        Completed
      </FilterLink>
    </p>
  )
}

const Todo = ({
  onClick,
  completed,
  text
}) => {
  return (
    <ListItem
      primaryText={ text }
      leftCheckbox={
        <Checkbox
          defaultChecked={ completed }
          onClick={ onClick }
        />
      }
    />
  )
}

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

let nextTodoId = 0
let AddTodo = ({ addTodo }) => {
  let input

  const onAddTodoClick = () => {
    addTodo(input.getValue())
    input.clearValue()
  }

  return (
    <div>
      <TextField
        hintText='Add Todo'
        ref={ node => input = node }
      />
      { ' ' }
      <RaisedButton label='Add Todo' onClick={ onAddTodoClick } />
    </div>
  )
}
AddTodo = connect(
  undefined,
  (dispatch) => {
    return {
      addTodo: (text) => {
        dispatch({
          type: ADD_TODO,
          id: nextTodoId++,
          text
        })
      }
    }
  }
)(AddTodo)

const getVisibleTodos = (
  todos,
  filter
) => {
  switch (filter) {
    case SHOW_ALL:
      return todos
    case SHOW_ACTIVE:
      return todos.filter(t => !t.completed)
    case SHOW_COMPLETED:
      return todos.filter(t => t.completed)
  }
}

const mapStateToTodoListProps = (
  state
) => {
  return {
    todos: getVisibleTodos(
      state.todos,
      state.visibilityFilter
    )
  }
}
const mapDispatchToTodoListProps = (
  dispatch
) => {
  return {
    onTodoClick: (id) => {
      dispatch({
        type: TOGGLE_TODO,
        id
      })
    }
  }
}
const VisibleTodoList = connect(
  mapStateToTodoListProps,
  mapDispatchToTodoListProps
)(TodoList)

const AppBarExampleIconMenu = () => (
  <AppBar
    style={ {backgroundColor: '#444'} }
    title='Flipjs woz here!'
    iconElementRight={
      <IconMenu
        iconButtonElement={
          <IconButton><MoreVertIcon /></IconButton>
        }
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      >
        <MenuItem primaryText='Refresh' />
        <MenuItem primaryText='Help' />
        <MenuItem primaryText='Sign out' />
      </IconMenu>
    }
  />
)

const TodoApp = () => {
  return (
    <div>
      <div className={ 'row' }>
        <AppBarExampleIconMenu />
      </div>
      <div className={ 'row' }>
        <div className={ 'col-sm-offset-4 col-sm-4' }>
          <AddTodo />
          <VisibleTodoList />
          <Footer />
        </div>
      </div>
    </div>
  )
}

const myStore = createStore(todoApp)
myStore.subscribe(() => console.log(myStore.getState().todos))

ReactDOM.render(
  <Provider store={ myStore }>
    <TodoApp />
  </Provider>,
  document.getElementById('app')
)
