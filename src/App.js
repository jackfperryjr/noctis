import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { HashRouter } from 'react-router-dom'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import register from './components/Register'
import login from './components/Login'
import profile from './components/Profile'
import './App.css'

class App extends Component {
  render () {
    return (
      <>
      <HashRouter basename={process.env.PUBLIC_URL}>
        <Route exact path='/' component={login} />
        <Route path='/login' component={login} />
        <Route path='/register' component={register} />
        <Route path='/profile' component={profile} />
      </HashRouter>
      </>
    )
  }
}

export default App
