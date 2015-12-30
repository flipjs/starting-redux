import { combineReducers } from 'redux'
import todos from './todos'
import visibilityFilter from './visibility-filter'

const rootReducer = combineReducers({
  todos,
  visibilityFilter
})

export default rootReducer
