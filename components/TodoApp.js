import React from 'react'
import NavBar from './NavBar'
import AddTodo from '../containers/AddTodo'
import VisibleTodoList from '../containers/VisibleTodos'
import Footer from './Footer'

const TodoApp = () => {
  const style = {
    margin: 30
  }
  return (
    <div>
      <div className='row'>
        <NavBar title='React-Redux Boilerplate' />
      </div>
      <div style={ style }>
      </div>
      <div className='row'>
        <div className='col-sm-6 col-sm-offset-4'>
          <AddTodo />
          <VisibleTodoList />
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default TodoApp

