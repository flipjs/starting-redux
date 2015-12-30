import { handleActions } from 'redux-actions'
import * as C from '../constants'

const visibilityFilter = handleActions({
  [C.SET_VISIBILITY_FILTER]: (state, action) => action.payload.filter
}, C.SHOW_ALL)

export default visibilityFilter

