import React from 'react'
import NavBar from './NavBar'
import AddTodo from '../containers/AddTodo'
import VisibleTodoList from '../containers/VisibleTodos'
import Footer from './Footer'

const TodoApp = () => {
  return (
    <div>
      <div className={ 'row' }>
        <NavBar title='React-Redux Boilerplate' />
      </div>
      <div style={ {margin: '30px auto'} }>
      </div>
      <div className={ 'row' }>
        <div className={ 'col-sm-offset-3 col-sm-6' }>
          <AddTodo />
          <VisibleTodoList />
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default TodoApp

