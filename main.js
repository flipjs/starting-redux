import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers } from 'redux'
import { Provider, connect } from 'react-redux'
import { createAction, handleActions } from 'redux-actions'

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

import * as C from './constants'

const todo = handleActions({
  [C.ADD_TODO]: (state, action) => {
    return {
      id: action.payload.id,
      text: action.payload.text,
      completed: false
    }
  },
  [C.TOGGLE_TODO]: (state, action) => {
    if (state.id !== action.payload.id) {
      return state
    }

    return {
      ...state,
      completed: !state.completed
    }
  }
})

const todos = handleActions({
  [C.ADD_TODO]: (state, action) => [
    ...state,
    todo(undefined, action)
  ],
  [C.TOGGLE_TODO]: (state, action) => state.map(t => todo(t, action))
}, [])

const visibilityFilter = handleActions({
  [C.SET_VISIBILITY_FILTER]: (state, action) => action.payload.filter
}, C.SHOW_ALL)

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
  const filter = ownProps.filter
  return {
    onClick: () => {
      dispatch(createAction(C.SET_VISIBILITY_FILTER)({filter}))
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
      <FilterLink filter={ C.SHOW_ALL }>
        All
      </FilterLink>
      {' '}
      <FilterLink filter={ C.SHOW_ACTIVE }>
        Active
      </FilterLink>
      {' '}
      <FilterLink filter={ C.SHOW_COMPLETED }>
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
    const text = input.getValue().trim()
    text && addTodo(text)
    input.clearValue()
  }

  return (
    <div>
      <TextField
        hintText='Enter Todo'
        ref={ node => input = node }
      />
      { ' ' }
      <FlatButton primary label='Click to add' onClick={ onAddTodoClick } />
    </div>
  )
}
AddTodo = connect(
  undefined,
  (dispatch) => {
    return {
      addTodo: (text) => {
        dispatch(createAction(C.ADD_TODO)({
          id: nextTodoId++,
          text
        }))
      }
    }
  }
)(AddTodo)

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
      dispatch(createAction(C.TOGGLE_TODO)({id}))
    }
  }
}
const VisibleTodoList = connect(
  mapStateToTodoListProps,
  mapDispatchToTodoListProps
)(TodoList)

const AppBarExampleIconMenu = () => (
  <AppBar
    title='flipjs.io'
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
      <div style={ {margin: '30px auto'} }>
      </div>
      <div className={ 'row' }>
        <div className={ 'col-sm-offset-3 col-sm-6' }>
          <AddTodo />
          <VisibleTodoList />
          <Footer />
        </div>
      </div>
    </div>
  )
}

ReactDOM.render(
  <Provider store={ createStore(todoApp) }>
    <TodoApp />
  </Provider>,
  document.getElementById('app')
)
