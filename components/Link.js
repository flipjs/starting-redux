import React from 'react'
import FlatButton from 'material-ui/lib/flat-button'

const Link = ({
  active,
  children,
  onClick
}) => {
  const onLinkClick = (e) => {
    e.preventDefault()
    onClick()
  }

  const style = {
    backgroundColor: '#ccc'
  }

  return (
    <FlatButton
      style={ style }
      label={ children }
      secondary
      onClick={ onLinkClick }
      disabled={ active }
    />
  )
}

export default Link

