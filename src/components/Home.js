import React, { Component } from 'react'
import { BrowserRouter as Route, Link } from 'react-router-dom'
import home from './Home'
import register from './Register'
import login from './Login'
import profile from './Profile'

class Home extends Component {
  constructor (props) {
    super(props)

    this.state = {
      // Random images are titled with random numbers.
      array: ['9193245.png',
        '9123473.png',
        '9158477.png',
        '9172346.png',
        '9348576.png',
        '9376523.png',
        '9384574.png']
    }
  }

  randomNumberGet () {
    return Math.floor(Math.random() * 6)
  }

  render () {
    const index = this.randomNumberGet()
    const icon = require('../icons/' + this.state.array[index])

    return (
      <div className='App'>
        <header className='App-header'>
          <Link to='/'><img src={icon} className='App-logo' alt='logo' /></Link>
          <p>
            <Link to='/login' className='App-link'>Login</Link> or <Link to='/register' className='App-link'>register</Link>.
          </p>
          <Route exact path='/' component={home} />
          <Route path='/register' component={register} />
          <Route path='/login' component={login} />
          <Route path='/profile' component={profile} />
        </header>
      </div>
    )
  }
}

export default Home
