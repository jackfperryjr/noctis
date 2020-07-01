import React, { Component } from 'react'
import { BrowserRouter as Route, Link, Redirect} from 'react-router-dom'
import * as moment from 'moment'

class Profile extends Component {
  constructor (props) {
    super(props)

    this.state = {
      username: '',
      email: '',
      firstname: '',
      lastname: '',
      age: '',
      birthdate: '',
      city: '',
      state: ''
    }
  }

  componentDidMount () {
    document.getElementById('overlay').style.display = 'none'
  }

  isLoggedIn () {
    if (sessionStorage.token && sessionStorage.token !== 'undefined') {
      return true
    } else {
      this.handleLogout()
      return false
    }
  }

  handleUserDelete (e) {
    document.getElementById('overlay').style.display = 'none'
    console.log('user deleted')
  }

  handleLogout (e) {
    document.getElementById('overlay').style.display = 'none'
    sessionStorage.clear()
    this.props.history.push('/noctis')
  }

  handleUserUpdate (e) {
    e.preventDefault()
    document.getElementById('overlay').style.display = 'block'
    const token = sessionStorage.token
    const user = JSON.parse(sessionStorage.user)
    const that = this
    if (this.validateForm()) {
      const payload = {
        id: user.id,
        username: (this.state.username === '') ? user.userName : this.state.username,
        email: (this.state.email === '') ? user.email : this.state.email,
        firstname: (this.state.firstname === '') ? user.firstName : this.state.firstname,
        lastname: (this.state.lastname === '') ? user.lastName : this.state.lastname,
        age: (this.state.age === '') ? user.age : this.state.age,
        birthdate: (this.state.birthdate === '') ? user.birthDate : this.state.birthdate,
        city: (this.state.city === '') ? user.city : this.state.city,
        state: (this.state.state === '') ? user.state : this.state.state
      }
      fetch('https://chocoboapi.azurewebsites.net/v1/manage/update', {
        method: 'put',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(payload)
      }).then(response => response.json())
        .then(function(response) {
          document.getElementById('overlay').style.display = 'none'
          if (response.user) {
            sessionStorage.setItem('user', JSON.stringify(response.user));
          } else {
            console.log('update failed')
          }
        })
    } else {

    }
  }

  validateForm() {
    let error = 0
    // if (this.state.username.length < 6) {
    //   error = 1
    // } 
    // if (this.state.firstname.length === 0) {
    //   error = 1
    // } 
    // if (this.state.email.length === 0) {
    //   error = 1
    // } 

    if (error === 1) {
      document.getElementById('overlay').style.display = 'none'
      document.getElementById('validation-error').style.display = 'block'
      return false
    } else {
      document.getElementById('validation-error').style.display = 'none'
      return true
    }
  }

  render () {
    if (this.isLoggedIn()) {
      const user = JSON.parse(sessionStorage.user)
      return (
        <header className='form-container'>
          <div className='profile-container'>
            <img className='wallpaper-photo' src={user.wallpaper} alt={user.userName} />
            <img className='profile-photo' src={user.photo} alt={user.userName} />
          </div>
          <p className='font-weight-bold'>{user.userName}</p>
          <p className='font-small text-secondary'>Joined: {moment(user.joinDate).format('MM/DD/yyyy')}</p>
          <form className='form-profile'>
          <div className='input-group input-group-override'>
                <input type='text' className='form-control' defaultValue={user.userName} placeholder='user name' onChange={(e) => this.setState({ username: e.target.value })} />
                <span>&nbsp;</span>
                <input type='text' className='form-control' defaultValue={user.email} placeholder='email' onChange={(e) => this.setState({ email: e.target.value })} />
            </div>
            <div className='input-group'>
                <input type='text' className='form-control' defaultValue={user.firstName} placeholder='first name' onChange={(e) => this.setState({ firstname: e.target.value })} />
                <span>&nbsp;</span>
                <input type='text' className='form-control' defaultValue={user.lastName} placeholder='last name' onChange={(e) => this.setState({ lastname: e.target.value })} />
            </div>
            <div className='input-group'>
                <input type='number' className='form-control' defaultValue={user.age} placeholder='00' onChange={(e) => this.setState({ age: e.target.value })} />
                <span>&nbsp;</span>
                <input type='date' className='form-control' defaultValue={moment(user.birthDate).format('YYYY-MM-DD')} onChange={(e) => this.setState({ birthdate: e.target.value })} />
            </div>
            <div className='input-group'>
                <input type='text' className='form-control' defaultValue={user.city} placeholder='city' onChange={(e) => this.setState({ city: e.target.value })} />
                <span>&nbsp;</span>
                <input type='text' className='form-control' defaultValue={user.state} placeholder='state' onChange={(e) => this.setState({ state: e.target.value })} />
            </div>
            <div id='validation-error'>form validation failed</div>
            <div className='button-container'>
              <button type='submit' title='Logout' className='btn btn-secondary btn-profile' onClick={(e) => this.handleLogout(e)}><i className='fas fa-door-closed'></i></button>
              <button type='submit' title='Update Information' className='btn btn-primary btn-profile' onClick={(e) => this.handleUserUpdate(e)}><i className='fas fa-user-edit'></i></button>
              <button type='submit' title='Delete Account' className='btn btn-danger btn-profile' onClick={(e) => this.handleUserDelete(e)}><i className='fas fa-user-times'></i></button>
            </div>
          </form>
        </header>
      )
    } else {
      return <Redirect to="/noctis" />
    }
  }
}

export default Profile
