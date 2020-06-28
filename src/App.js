import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import register from './components/Register'
import login from './components/Login'
import profile from './components/Profile'
import './App.css'

class App extends Component {
  render () {
    return (
      <Router basename='/'>
        <Navbar className='dark-nav' />

        <Route exact path='/noctis' component={login} />
        <Route path='/' component={login} />
        <Route path='/login' component={login} />
        <Route path='/register' component={register} />
        <Route path='/profile' component={profile} />
      </Router>
    )
  }
}

export default App
