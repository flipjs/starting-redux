import React from 'react'
import ListItem from 'material-ui/lib/lists/list-item'
import Checkbox from 'material-ui/lib/checkbox'

const Todo = ({
  onClick,
  completed,
  text
}) => {
  return (
    <ListItem
      primaryText={ text }
      leftCheckbox={
        <Checkbox
          defaultChecked={ completed }
          onClick={ onClick }
        />
      }
    />
  )
}

export default Todo

