import { connect } from 'react-redux'
import { createAction } from 'redux-actions'
import Link from '../components/Link'
import * as C from '../constants'

const mapStateToProps = (
  state,
  ownProps
) => {
  return {
    active: ownProps.filter === state.visibilityFilter
  }
}

const mapDispatchToProps = (
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
  mapStateToProps,
  mapDispatchToProps
)(Link)

export default FilterLink
