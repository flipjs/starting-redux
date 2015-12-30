import React from 'react'
import { connect } from 'react-redux'
import { createAction } from 'redux-actions'
import FlatButton from 'material-ui/lib/flat-button'
import TextField from 'material-ui/lib/text-field'
import * as C from '../constants'

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

export default AddTodo

