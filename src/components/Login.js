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
      user: {},
      success: false
    }
  }

  componentDidMount () {
    document.getElementById('overlay').style.display = 'none'
    if (localStorage.token) {
      let user = JSON.parse(localStorage.user);
      this.setState({
        success: true,
        user: user
      })
    }
  }

  validateForm () {
    if (this.state.username.length > 0 && this.state.username.length > 0) {
      return true
    } else {
      document.getElementById('validation-error').style.display = 'block'
      return false
    }
  }

  handleLogin (e) {
    e.preventDefault()
    document.getElementById('login-error').style.display = 'none'
    document.getElementById('validation-error').style.display = 'none'
    if (this.validateForm()) {
      const that = this
      document.getElementById('overlay').style.display = 'block'
      const payload = {
        username: this.state.username,
        password: this.state.password,
        audience: 'chocoboAPI'
      }
      fetch('https://chocobo.moogleapi.com/v1/account/login', {
        method: 'post',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      }).then(response => response.json())
        .then(function(response){
          if (response.accessToken) {
            localStorage.setItem('accessToken', response.accessToken);
            localStorage.setItem('refreshToken', response.refreshToken);
            localStorage.setItem('user', JSON.stringify(response.user));
            that.setState({
              success: true,
              user: response.user
            })
          } else {
            console.log('failed login')
            console.log(response.message)
            document.getElementById('overlay').style.display = 'none'
            document.getElementById('login-error').style.display = 'block'
          }
        })
      } else {
        console.log('validation failed')
      }
  }

  render () {
    const icon = require('../icons/moogleapi-icon-512.png')
    if (this.state.success === true) {
      return <Redirect to="/profile" />
    } else
    {
      return (
        <header className='form-container login-screen'>
          <img src={icon} className='main-photo' alt='logo' />
          <p>Enter credentials</p>
          <Route path='/login' component={login} />
          <Route path='/register' component={register} />
          <form>
            <div className='form-group'>
              <input type='text' className='form-control login-username' placeholder='enter username' onChange={(e) => this.setState({ username: e.target.value })} />
            </div>
            <div className='form-group'>
              <input type='password' className='form-control' placeholder='enter password' onChange={(e) => this.setState({ password: e.target.value })} />
            </div>
            <div id='login-error'>invalid credentials</div>
            <div id='validation-error'>enter your credentials</div>
            <button type='submit' className='btn btn-primary btn-block' onClick={(e) => this.handleLogin(e)}>Login</button>
          </form>
          <p className='font-regular'>Or <Link to='/register' className='link'>register</Link></p>
        </header>
      )
    }
  }
}

export default Login
