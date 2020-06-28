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

  validateForm () {
    let error = 0
    if (this.state.username.length < 6) {
      error = 1
    } 
    if (this.state.email.length < 6) {
      error = 1
    } 
    if (this.state.firstname.length === 0) {
      error = 1
    } 
    if (this.state.password.length < 9) {
      error = 1
    } 
    if (this.state.password.length > 6 && this.state.password != this.state.confirmpassword) {
      error = 1
    } 

    if (error === 1) {
      document.getElementById('validation-error').style.display = 'block'
      return false
    } else {
      document.getElementById('validation-error').style.display = 'none'
      return true
    }
  }

  handleRegistration (e) {
    const that = this
    e.preventDefault()
    document.getElementById('validation-error').style.display = 'none'
    if (this.validateForm()) {
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
            that.setState({
              success: true,
              user: response.user
            })
          } else {
            console.log('registration failed')
          }
        })
    } else {

    }
  }

  render () {
    const icon = require('../icons/chocoboapi-c-2.png')
    if (this.state.success === true) {
      return <Redirect to="/noctis/profile" />
    } else
    {
      return (
        <header className='form-container'>
          <img src={icon} className='main-photo' alt='logo' />
          <p>Sign up!</p>
          <Route exact path='/noctis' component={login} />
          <Route path='/noctis/login' component={login} />
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
            <div id='validation-error'>form validation failed</div>
            <button type='submit' className='btn btn-primary btn-block' onClick={(e) => this.handleRegistration(e)}>Register</button>
          </form>
          <p className='font-regular'>Or <Link to='/noctis/login' className='link'>login</Link></p>
        </header>
      )
    }
  }
}

export default Register
