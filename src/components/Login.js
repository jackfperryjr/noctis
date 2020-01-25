import React, { Component } from 'react'
import { BrowserRouter as Route, Link } from 'react-router-dom'
import profile from './Profile'

class Login extends Component {
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
        '9384574.png'],
      username: '',
      password: ''
    }
  }

  componentDidMount () {

  }

  handleLogin (e) {
    e.preventDefault()
    const payload = {
      username: this.state.username,
      password: this.state.password,
      audience: 'Aranea'
    }
    fetch('https://localhost:5001/api/login', {
      method: 'post',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }).then(response => response.json())
      .then(response => console.log(response))
  }

  randomNumberGet () {
    return Math.floor(Math.random() * 6)
  }

  render () {
    const index = this.randomNumberGet()
    const icon = require('../icons/' + this.state.array[index])
    return (
      <header className='App-header'>
        <Link to='/'><img src={icon} className='App-logo' alt='logo' /></Link>
        <p>
          <Link to='/register' className='App-link'>Register</Link>
        </p>
        <form>
          <div className='form-group'>
            <input type='text' className='form-control' placeholder='enter username' onChange={(e) => this.setState({ username: e.target.value })} />
          </div>
          <div className='form-group'>
            <input type='password' className='form-control' placeholder='enter password' onChange={(e) => this.setState({ password: e.target.value })} />
          </div>
          <button type='submit' className='btn btn-primary btn-block' onClick={(e) => this.handleLogin(e)}>Login</button>
        </form>
      </header>
    )
  }
}

export default Login
