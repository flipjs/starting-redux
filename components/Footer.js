import React from 'react'
import FilterLink from '../containers/FilterLink'
import * as C from '../constants'

const Footer = () => {
  return (
    <p>
      <b>Filter:</b>
      {' '}
      <FilterLink filter={ C.SHOW_ALL }>
        All
      </FilterLink>
      {' '}
      <FilterLink filter={ C.SHOW_ACTIVE }>
        Active
      </FilterLink>
      {' '}
      <FilterLink filter={ C.SHOW_COMPLETED }>
        Completed
      </FilterLink>
    </p>
  )
}

export default Footer

