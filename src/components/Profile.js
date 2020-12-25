import React, { Component } from 'react'
import { BrowserRouter as Redirect} from 'react-router-dom'
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
      state: '',
      photo: '',
      wallpaper: ''
    }
  }

  componentDidMount () {
    document.getElementById('overlay').style.display = 'none'
  }

  isLoggedIn () {
    if (localStorage.accessToken && localStorage.accessToken !== 'undefined') {
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

  handleResponseErrors (error) {
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

  handleLogout (e) {
    document.body.style.background = ''
    document.getElementById('overlay').style.display = 'none'
    localStorage.clear()
    this.props.history.push('/')
  }

  handleUserUpdate (e) {
    e.preventDefault()
    document.getElementById('overlay').style.display = 'block'
    const accessToken = localStorage.accessToken
    const user = JSON.parse(localStorage.user)
    if (this.validateForm()) {
      let payload = new FormData()
      payload.append('id', user.id)
      payload.append('portrait', (this.state.photo === '') ? user.photo : document.forms['profile-form']['upload-photo'].files[0])
      payload.append('wallpaper', (this.state.wallpaper === '') ? user.wallpaper : document.forms['profile-form']['upload-wallpaper'].files[0])
      payload.append('username', (this.state.username === '') ? user.userName : this.state.username)
      payload.append('email', (this.state.email === '') ? user.email : this.state.email)
      payload.append('firstname', (this.state.firstname === '') ? user.firstName : this.state.firstname)
      payload.append('lastname', (this.state.lastname === '') ? user.lastName : this.state.lastname)
      payload.append('age', (this.state.age === '') ? user.age : this.state.age)
      payload.append('birthdate', (this.state.birthdate === '') ? user.birthDate : this.state.birthdate)
      payload.append('city', (this.state.city === '') ? user.city : this.state.city)
      payload.append('state', (this.state.state === '') ? user.state : this.state.state)
      fetch('https://chocobo.moogleapi.com/v1/manage/update', {
        method: 'put',
        headers: {
          'Authorization': 'Bearer ' + accessToken
        },
        body: payload
      }).then(response => response.json())
        .then(function(response) {
          document.getElementById('overlay').style.display = 'none'
          if (response.user) {
            localStorage.setItem('user', JSON.stringify(response.user));
          } else {
            console.log('update failed')
            console.log(response.errors)
          }
        })
    } else {
      console.log('validation failed')
    }
  }

  validateForm() {
    let error = 0

    if (error === 1) {
      document.getElementById('overlay').style.display = 'none'
      document.getElementById('validation-error').style.display = 'block'
      return false
    } else {
      document.getElementById('validation-error').style.display = 'none'
      return true
    }
  }

  handlePhotoUpload = () => {
    document.getElementById('upload-photo').click()
  }

  handleProfilePhotoChange (e) {
    let img = URL.createObjectURL(e.target.files[0]);
    if (img) {
      document.getElementById('profile-photo').src = img
      this.setState({ photo: e.target.value })
    }
  }

  render () {
    if (this.isLoggedIn()) {
      const user = JSON.parse(localStorage.user)
      let userPhoto
      let userWallpaper
      let portrait = user.photos.filter(function(e){
        return e.portrait === 1
      })

      let wallpaper = user.photos.filter(function(e){
        return e.wallpaper == 1
      })
      if (wallpaper.length > 0) {
        userWallpaper = wallpaper[0].url
      } else {
        userWallpaper = 'https://rikku.blob.core.windows.net/wallpaper/00000000-0000-0000-0000-000000000000.png'
      }
      
      if (portrait.length > 0) {
        userPhoto = portrait[0].url
      } else {
        userPhoto = 'https://rikku.blob.core.windows.net/portrait/00000000-0000-0000-0000-000000000000.png'
      }
      
      return (
        <header className='form-container'>
          <div className='profile-container'>
            <img id='wallpaper-photo' className='wallpaper-photo' src={userWallpaper} alt={user.userName} />
            <img id='profile-photo' className='profile-photo' src={userPhoto} alt={user.userName} onClick={this.handlePhotoUpload}/>
          </div>
          <form name='profile-form' id='profile-form' className='profile-form' encType='multipart/form-data' method='put'>
          <p className='font-weight-bold login-username'>{user.userName}</p>
          <p className='font-small text-secondary'>Joined {moment(user.joinDate).format('MMMM DD, YYYY')}</p>
          <div className='input-group input-group-override'>
                <input type='text' className='form-control login-username' defaultValue={user.userName} placeholder='user name' onChange={(e) => this.setState({ username: e.target.value })} />
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
            <input id="upload-photo" type="file" accept="image/*" name="photo" ref='photoUploader' onChange={(e) => this.handleProfilePhotoChange(e)} />
            <input id="upload-wallpaper" type="file" accept="image/*" name="wallpaper" />
            <div className='button-container text-muted'>
              <p title='Logout' onClick={(e) => this.handleLogout(e)}>Logout</p>
              <p title='Update Information' onClick={(e) => this.handleUserUpdate(e)}>Update Info</p>
              <p title='Delete Account' className="text-danger" onClick={(e) => this.handleUserDelete(e)}>Delete Account</p>
            </div>
          </form>
        </header>
      )
    } else {
      return <Redirect to="/" />
    }
  }
}

export default Profile
