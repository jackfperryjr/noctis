import React, { Component } from 'react'
import { BrowserRouter as Route, Link, Redirect} from 'react-router-dom'
import register from './Register'
import login from './Login'

class Login extends Component {
  constructor (props) {
    super(props)

    this.state = {
      username: '',
      password: '',
      success: false
    }
  }

  componentDidMount () {
    document.getElementById('overlay').style.display = 'none'
  }

  validateForm() {
    if (this.state.username.length > 0 && this.state.username.length > 0) {
      return true
    } else {
      return false
    }
  }

  handleLogin (e) {
    if (this.validateForm()) {
      document.getElementById('overlay').style.display = 'block'
      e.preventDefault()
      const payload = {
        username: this.state.username,
        password: this.state.password,
        audience: 'MoogleApi'
      }
      fetch('https://chocoboapi.azurewebsites.net/v1/account/login', {
        method: 'post',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      }).then(response => response.json())
        .then(function(response){
          if (response.token) {
            sessionStorage.setItem('token', response.token);
            sessionStorage.setItem('user', JSON.stringify(response.user));
            window.location.href = '/profile'
          } else {
            console.log('failed login')
            document.getElementById('overlay').style.display = 'none'
          }
        })
      } else {
        console.log('validation failed')
      }
  }

  render () {
    const icon = require('../icons/chocoboapi.png')
    if (this.state.success === true) {
      return <Redirect to="/profile" />
    } else
    {
      return (
        <header className='form-container'>
          <img src={icon} className='main-photo' alt='logo' />
          <p>Enter credentials</p>
          <Route exact path='/' component={login} />
          <Route path='/register' component={register} />
          <form>
            <div className='form-group'>
              <input type='text' className='form-control' placeholder='enter username' onChange={(e) => this.setState({ username: e.target.value })} />
            </div>
            <div className='form-group'>
              <input type='password' className='form-control' placeholder='enter password' onChange={(e) => this.setState({ password: e.target.value })} />
            </div>
            <button type='submit' className='btn btn-primary btn-block' onClick={(e) => this.handleLogin(e)}>Login</button>
          </form>
          <p className='font-regular'>Or <Link to='/register' className='link'>register</Link></p>
        </header>
      )
    }
  }
}

export default Login
