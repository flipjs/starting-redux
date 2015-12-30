import React from 'react'
import { connect } from 'react-redux'
import addTodo from '../actions/add-todo'
import setVisibility from '../actions/set-visibility'
import FlatButton from 'material-ui/lib/flat-button'
import TextField from 'material-ui/lib/text-field'
import * as C from '../constants'

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
        dispatch(setVisibility(C.SHOW_ALL))
        dispatch(addTodo(text))
      }
    }
  }
)(AddTodo)

export default AddTodo

