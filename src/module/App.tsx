import React from 'react'
import { Provider, Router } from 'backbone-react'
import store from '../store'
import router from '../router'
import './App.less'

export default () => (
  <Provider stores={store}>
    <Router router={router} />
  </Provider>
)
