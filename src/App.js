import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import home from './components/Home'
import register from './components/Register'
import login from './components/Login'
import icon from './icons/9193245.png'
import './App.css'

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      array: ['9193245', '9123473', '9158477', '9172346', '9348576', '9376523', '9384574']
    }
  }
  render () {
    //let random = 1
    //let icon = './icons/'+this.state.array[random]+'.png'

    return (
    <div className='App'>
      <Navbar className='dark-nav'>react-app</Navbar>
      <header className='App-header'>
        <Router basename='/'>
        <Link to='/'><img src={icon} className="App-logo" alt="logo" /></Link>
            <p>
              <Link to='/login' className='App-link'>Login</Link> or <Link to='/register' className='App-link'>register</Link>.
            </p>
          <Switch>
            <Route exact path='/' component={home} />
            <Route path='/register' component={register} />
            <Route path='/login' component={login} />
          </Switch>
        </Router>
      </header>
    </div>
    )
  }
}

export default App