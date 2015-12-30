import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import TodoApp from './components/TodoApp'
import App from './containers/App'
import Foo from './components/Foo'
import Bar from './components/Bar'
import { Router, Route, IndexRoute } from 'react-router'
import { createHistory } from 'history'
import { syncReduxAndRouter, routeReducer } from 'redux-simple-router'
import reducers from './reducers'

const reducer = combineReducers(Object.assign({}, reducers, {
  routing: routeReducer
}))

const store = createStore(reducer)
const history = createHistory()

syncReduxAndRouter(history, store)

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path='/' component={App}>
        <IndexRoute component={TodoApp}/>
        <Route path='foo' component={Foo}/>
        <Route path='bar' component={Bar}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
)

