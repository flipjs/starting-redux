import { createAction } from 'redux-actions'
import * as C from '../constants'

let nextTodoId = 0

const addTodo = (text) => createAction(C.ADD_TODO)({
  id: nextTodoId++,
  text
})

export default addTodo

