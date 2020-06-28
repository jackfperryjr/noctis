import React, { Component } from 'react'
import { BrowserRouter as Route, Link, Redirect } from 'react-router-dom'
import login from './Login'

class Register extends Component {
  constructor (props) {
    super(props)

    this.state = {
      username: '',
      firstname: '',
      email: '',
      password: '',
      confirmpassword: '',
      success: false
    }
  }

  handleRegistration (e) {
    e.preventDefault()
    const payload = {
      username: this.state.username,
      firstname: this.state.firstname,
      email: this.state.email,
      password: this.state.password,
      confirmpassword: this.state.confirmpassword,
      audience: 'MoogleApi'
    }
    fetch('https://chocoboapi.azurewebsites.net/v1/account/register', {
      method: 'post',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }).then(response => response.json())
      .then(function(response){
        document.getElementById('overlay').style.display = 'none'
        if (response.token) {
          sessionStorage.setItem('token', response.token);
          sessionStorage.setItem('user', JSON.stringify(response.user));
          window.location.href = '/profile'
        } else {
          console.log('registration failed')
        }
      })
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
          <p>Sign up!</p>
          <Route exact path='/' component={login} />
          <Route path='/login' component={login} />
          <form>
            <div className='form-group'>
              <input type='text' className='form-control' placeholder='username' onChange={(e) => this.setState({ username: e.target.value })} />
            </div>
            <div className='form-group'>
              <input type='text' className='form-control' placeholder='first name' onChange={(e) => this.setState({ firstname: e.target.value })} />
            </div>
            <div className='form-group'>
              <input type='email' className='form-control' placeholder='enter email' onChange={(e) => this.setState({ email: e.target.value })} />
            </div>
            <div className='form-group'>
              <input type='password' className='form-control' placeholder='enter password' onChange={(e) => this.setState({ password: e.target.value })} />
            </div>
            <div className='form-group'>
              <input type='password' className='form-control' placeholder='confirm password' onChange={(e) => this.setState({ confirmpassword: e.target.value })} />
            </div>
            <button type='submit' className='btn btn-primary btn-block' onClick={(e) => this.handleRegistration(e)}>Register</button>
          </form>
          <p className='font-regular'>Or <Link to='/login' className='link'>login</Link></p>
        </header>
      )
    }
  }
}

export default Register
