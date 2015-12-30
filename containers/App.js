import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { pushPath } from 'redux-simple-router'

const App = ({
  pushPath,
  children
}) => (
  <div>
    <header>
      Links:
      {' '}
      <Link to='/'>Home</Link>
      {' '}
      <Link to='/foo'>Foo</Link>
      {' '}
      <Link to='/bar'>Bar</Link>
    </header>
    <div style={{marginTop: '1.5em'}}>{children}</div>
  </div>
)

export default connect(
  null,
  { pushPath }
)(App)
