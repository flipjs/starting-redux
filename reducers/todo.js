import { handleActions } from 'redux-actions'
import * as C from '../constants'

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

export default todo

