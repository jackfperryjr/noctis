import React, { useState } from 'react'
import { BrowserRouter as Route, Link, Redirect} from 'react-router-dom'
import { useAuth } from '../context/auth'
import icon from '../icons/logo512.png'

function Login(props) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  // const [overlay, setOverlay] = useState(false)
  const { setAuthToken } = useAuth()

  function validateForm() {
    if (username.length > 0 && username.length > 0) {
      return true
    } else {
      document.getElementById('validation-error').style.display = 'block'
      return false
    }
  }

  function handleLogin(e) {
    e.preventDefault()
    document.getElementById('login-error').style.display = 'none'
    document.getElementById('validation-error').style.display = 'none'
    if (validateForm()) {
      document.getElementById('overlay').style.display = 'block'
      const payload = {
        username: username,
        password: password,
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
            localStorage.setItem('user', JSON.stringify(response.user))
            setAuthToken(response.accessToken)
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
  if (localStorage.accessToken) {
    props.history.push('/profile')
    return <Redirect to='/profile' />
  } else {
    return (
      <header className='form-container login-screen'>
        <img src={icon} className='main-photo' alt='logo' />
        <p>Noctis</p>
        <form>
          <div className='form-group'>
            <input type='text' className='form-control login-username' placeholder='enter username' value={username} onChange={e => { setUsername(e.target.value) }} />
          </div>
          <div className='form-group'>
            <input type='password' className='form-control' placeholder='enter password' value={password} onChange={e => { setPassword(e.target.value) }} />
          </div>
          <div id='login-error'>invalid credentials</div>
          <div id='validation-error'>enter your credentials</div>
          <button type='submit' className='btn btn-primary btn-block' onClick={(e) => handleLogin(e)}>Login</button>
        </form>
        <p className='font-regular mt-3'>Or <Link to='/register' className='link'>register</Link></p>
      </header>
    )
  }
}

export default Login
