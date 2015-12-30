import { createAction } from 'redux-actions'
import * as C from '../constants'

const toggleTodo = (id) => createAction(C.TOGGLE_TODO)({ id })

export default toggleTodo

