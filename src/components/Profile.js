import React, { useState } from 'react'
import { BrowserRouter as Redirect} from 'react-router-dom'
import moment from 'moment'
import {  refreshTokens, 
          refreshUser,
          dismiss, 
          handleUserDelete, 
          handleUserPhotoUpload, 
          handleUserWallpaperUpload,
          getUserPhoto,
          getUserWallpaper } from '../utility'

function Profile(props) {
  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [bio, setBio] = useState('')
  const [birthdate, setBirthdate] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [photo, setPhoto] = useState('')
  const [wallpaper, setWallpaper] = useState('')
  // const [password, setPassword] = useState('')
  // const [confirmpassword, setConfirmpassword] = useState('')
  // const [overlay, setOverlay] = useState(false)
  let user
  if (!localStorage.user || !localStorage.accessToken) {
    props.history.push('/login')
    return <Redirect to='/login' />
  } else {
    refreshUser()
    user = JSON.parse(localStorage.user)
  }

  let userPhoto = getUserPhoto(user)
  let userWallpaper = getUserWallpaper(user)
  document.getElementById('overlay').style.display = 'none'

  // TODO: Implement this.
  // function handleResponseErrors(error) {
  //   let password = error.Password
  //   let cpassword = error.ConfirmPassword
  //   let email = error.Email
  //   let display = ''

  //   if (email !==  undefined) {
  //     display = email
  //   }
  //   if (password !== undefined) {
  //     display += '<br/>' + password
  //   }
  //   if (cpassword !== undefined) {
  //     display += '<br/>' + cpassword
  //   }
  //   document.getElementById('validation-error').innerHTML = display
  //   document.getElementById('validation-error').style.display = 'block'
  // }

  function handleLogout() {
    localStorage.clear()
    props.history.push('/')
    return <Redirect to='/' />
  }

  function handleUserUpdate(e) {
    refreshTokens(JSON.parse(localStorage.accessToken))
    e.preventDefault()
    document.getElementById('overlay').style.display = 'block'
    const user = JSON.parse(localStorage.user)
    if (validateForm()) {
      let payload = new FormData()
      payload.append('id', user.id)
      payload.append('portrait', (photo === '') ? user.photo : document.forms['profile-form']['upload-photo'].files[0])
      payload.append('wallpaper', (wallpaper === '') ? user.wallpaper : document.forms['profile-form']['upload-wallpaper'].files[0])
      payload.append('username', (username === '') ? user.userName : username)
      payload.append('email', (email === '') ? user.email : email)
      payload.append('name', (name === '') ? user.name : name)
      payload.append('bio', (bio === '') ? user.bio : bio)
      payload.append('birthdate', (birthdate === '') ? user.birthDate : birthdate)
      payload.append('city', (city === '') ? user.city : city)
      payload.append('state', (state === '') ? user.state : state)
      fetch('https://chocobo.moogleapi.com/v1/manage/update', {
        method: 'put',
        headers: {
          'Authorization': 'Bearer ' + JSON.parse(localStorage.accessToken)
        },
        body: payload
      }).then(function(response) {
        if (response.status === 200) {
          return response.json().then((data) => {
            document.getElementById('overlay').style.display = 'none'
            if (data.user) {
              localStorage.setItem('user', JSON.stringify(data.user))
              document.getElementById('update-notification').style.display = 'block'
            } else {
              console.log('update failed')
              console.log(response.errors)
            }
          })
        } else {
          console.log('Probably an invalid token. Log in again.')
          localStorage.clear()
          return <Redirect to='/' />
        }
      })
    } else {
      console.log('validation failed')
    }
  }

  function validateForm() {
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

  function handlePhotoChange(e) {
    let img = URL.createObjectURL(e.target.files[0]);
    if (img) {
      document.getElementById('profile-photo').style.backgroundImage = 'url('+img+')'
      setPhoto(e.target.value)
    }
  }

  function handleWallpaperChange(e) {
    let img = URL.createObjectURL(e.target.files[0]);
    if (img) {
      document.getElementById('wallpaper-photo').style.backgroundImage = 'url('+img+')'
      setWallpaper(e.target.value)
    }
  }

  return (
    <div className='form-container form-container-profile component'>
    <div className='profile-container'>
      <div id='wallpaper-photo' className='wallpaper-photo' style={ userWallpaper ? { backgroundImage: 'url('+userWallpaper+')'} : {} } onClick={handleUserWallpaperUpload}>
      <span><i className="fas fa-camera"></i></span>
      </div>
      <div id='profile-photo' className='profile-photo' style={ userPhoto ? { backgroundImage: 'url('+userPhoto+')'} : {} } onClick={handleUserPhotoUpload}>
        <span><i className="fas fa-camera"></i></span>
      </div>
    </div>
    <form name='profile-form' id='profile-form' className='profile-form' encType='multipart/form-data' method='put'>
      <p className='font-weight-bold login-username'>{user.userName}</p>
      <p className='font-small text-secondary'>Joined {moment(user.joinDate).format('MMMM DD, YYYY')}</p>
      <div id='update-notification' className='alert alert-success alert-dismissible text-center fade show small' role='alert' style={{ display: 'none' }}>
        <span style={{ fontSize: '16px' }}>User information updated!</span>
        <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={dismiss}>
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      {/* <div className='input-group mb-2 row'>
        <label class="col-3 col-form-label px14 text-left font-weight-bold ">Username</label>
        <input type='text' className='form-control login-username col-9' defaultValue={user.userName} placeholder='Enter username' onChange={e => { setUsername(e.target.value) }} />
      </div> */}
      <div className='input-group mb-2 row'>
        <label class="col-3 col-form-label px14 text-left font-weight-bold ">Email</label>
        <input type='text' className='form-control col-9' defaultValue={user.email} placeholder='Enter email' onChange={e => { setEmail(e.target.value) }} />
        <i class="fas fa-pencil-alt"></i>
      </div>
      <div className='input-group mb-2 row'>
        <label class="col-3 col-form-label px14 text-left font-weight-bold ">Name</label>
        <input type='text' className='form-control col-9' defaultValue={user.name} placeholder='Enter name' onChange={e => { setName(e.target.value) }} />
      </div>
      <div className='input-group mb-2 row'>
        <label class="col-3 col-form-label px14 text-left font-weight-bold ">Birthday</label>
        <input type='date' className='form-control col-9' defaultValue={moment(user.birthDate).format('YYYY-MM-DD')}  onChange={e => { setBirthdate(e.target.value) }} />
      </div>
      <div className='input-group mb-2 row'>
        <label class="col-3 col-form-label px14 text-left font-weight-bold ">City</label>
        <input type='text' className='form-control col-9' defaultValue={user.city} placeholder='Enter city' onChange={e => { setCity(e.target.value) }} />
      </div>
      <div className='input-group mb-2 row'>
        <label class="col-3 col-form-label px14 text-left font-weight-bold ">State</label>
        <input type='text' className='form-control col-9' defaultValue={user.state} placeholder='Enter state' onChange={e => { setState(e.target.value) }} />
      </div>
      <div className='input-group mb-2 row'>
        <label class="col-3 col-form-label px14 text-left font-weight-bold ">Bio</label>
        <textarea type='text' className='form-control' defaultValue={user.bio} placeholder='Enter a brief description of yourself' onChange={e => { setBio(e.target.value) }}></textarea>
      </div>
      <div id='validation-error'>form validation failed</div>
      <input id="upload-photo" type="file" accept="image/*" name="photo" onChange={e => { handlePhotoChange(e) }} />
      <input id="upload-wallpaper" type="file" accept="image/*" name="wallpaper" onChange={e => { handleWallpaperChange(e) }} />
      <div className='button-container text-muted'>
        <p title='Logout' onClick={handleLogout}>Logout</p>
        <p title='Update Information' onClick={e => { handleUserUpdate(e) }}>Update Info</p>
        <p title='Delete Account' className="text-danger" onClick={handleUserDelete}>Delete Account</p>
      </div>
    </form>
  </div>
  )
}

export default Profile
