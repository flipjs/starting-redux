import { createAction } from 'redux-actions'
import * as C from '../constants'

const setVisibility = (filter) => createAction(C.SET_VISIBILITY_FILTER)({ filter })

export default setVisibility
