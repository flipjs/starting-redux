import { handleActions } from 'redux-actions'
import todo from './todo'
import * as C from '../constants'

const todos = handleActions({
  [C.ADD_TODO]: (state, action) => [
    ...state,
    todo(undefined, action)
  ],
  [C.TOGGLE_TODO]: (state, action) => state.map(t => todo(t, action))
}, [])

export default todos
