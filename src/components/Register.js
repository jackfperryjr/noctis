import React, { useState } from 'react'
import { BrowserRouter as Route, Link, Redirect } from 'react-router-dom'
import { useAuth } from '../context/auth'
import icon from '../icons/logo512.png'

function Register(props) {
  const [username, setUsername] = useState('')
  const [firstname, setFirstname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmpassword, setConfirmpassword] = useState('')
  // const [overlay, setOverlay] = useState(false)
  const { setAuthToken } = useAuth()

 function validateForm() {
    let error = 0
    if (username.length < 4) {
      error = 1
    } 
    if (email.length < 6) {
      error = 1
    } 
    if (firstname.length === 0) {
      error = 1
    } 
    // if (this.state.password.length < 6 || this.state.password.length > 12) {
    //   error = 1
    // } 
    // if (this.state.password.length > 6 && this.state.password !== this.state.confirmpassword) {
    //   error = 1
    // } 

    if (error === 1) {
      document.getElementById('validation-error').style.display = 'block'
      return false
    } else {
      document.getElementById('validation-error').style.display = 'none'
      return true
    }
  }

  function handleResponseErrors(error) {
    let password = error.Password
    let cpassword = error.ConfirmPassword
    let email = error.Email
    let display = ''

    if (email !==  undefined) {
      display = email
    }
    if (password !== undefined) {
      display += '<br/>' + password
    }
    if (cpassword !== undefined) {
      display += '<br/>' + cpassword
    }
    document.getElementById('validation-error').innerHTML = display
    document.getElementById('validation-error').style.display = 'block'
  }

  function handleRegistration(e) {
    e.preventDefault()
    document.getElementById('validation-error').style.display = 'none'
    if (validateForm()) {
      document.getElementById('overlay').style.display = 'block'
      const payload = {
        username: username,
        firstname: firstname,
        email: email,
        password: password,
        confirmpassword: confirmpassword,
        audience: 'chocoboAPI'
      }
      fetch('https://chocobo.moogleapi.com/v1/account/register', {
        method: 'post',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      }).then(response => response.json())
        .then(function(response){
          document.getElementById('overlay').style.display = 'none'
          if (response.accessToken) {
            localStorage.setItem('user', JSON.stringify(response.user))
            localStorage.setItem('refreshToken', JSON.stringify(response.refreshToken))
            setAuthToken(response.accessToken)
          } else {
            console.log('registration failed')
            console.log(response.errors)
            handleResponseErrors(response.errors)
          }
        })
    } else {
        console.log('validation failed')
    }
  }

  if (localStorage.accessToken) {
    props.history.push('/profile')
    return <Redirect to='/profile' />
  } else {
    return (
      <header className='form-container register-screen'>
        <img src={icon} className='main-photo' alt='logo' />
        <p>Sign up!</p>
        <form>
          <div className='form-group'>
            <input type='text' className='form-control login-username' placeholder='username' onChange={e => { setUsername(e.target.value) }} />
          </div>
          <div className='form-group'>
            <input type='text' className='form-control' placeholder='first name' onChange={e => { setFirstname(e.target.value) }} />
          </div>
          <div className='form-group'>
            <input type='email' className='form-control' placeholder='enter email' onChange={e => { setEmail(e.target.value) }} />
          </div>
          <div className='form-group'>
            <input type='password' className='form-control' placeholder='enter password' onChange={e => { setPassword(e.target.value) }} />
          </div>
          <div className='form-group'>
            <input type='password' className='form-control' placeholder='confirm password' onChange={e => { setConfirmpassword(e.target.value) }} />
          </div>
          <div id='validation-error'>form validation failed</div>
          <button type='submit' className='btn btn-primary btn-block' onClick={(e) => handleRegistration(e)}>Register</button>
        </form>
        <p className='font-regular mt-3'>Or <Link to='/login' className='link'>login</Link></p>
      </header>
    )
  }
}

export default Register
