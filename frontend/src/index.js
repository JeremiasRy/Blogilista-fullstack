import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {
  BrowserRouter as Router
} from "react-router-dom"

import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import loginReducer from './reducers/loginReducer'
import usersReducer from './reducers/usersReducer'

const store = configureStore({
    reducer: {
        notification: notificationReducer,
        blog: blogReducer,
        login: loginReducer,
        users: usersReducer
    }
})

ReactDOM.render(
<Provider store={store}>
  <Router>
    <App />
  </Router>
</Provider>  
, document.getElementById('root'))