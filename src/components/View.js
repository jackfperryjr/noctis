import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { getUserPhoto, getUserWallpaper } from '../utility'

const useFetch = url => {
    const [user, setUser] = useState(null)

    async function fetchData() {
        const response = await fetch(url)
        const user = await response.json()
        setUser(user)
    }

    useEffect(() => {fetchData()},[url])
    return user
}

function View(props) {
  const id = props.match.params.id
  const user = useFetch('https://chocobo.moogleapi.com/v1/manage/get/' + id)
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

  if (user) {
    let userPhoto = getUserPhoto(user)
    let userWallpaper = getUserWallpaper(user)

    return (
        <div className='form-container form-container-profile component'>
        <div className='profile-container'>
        <div id='wallpaper-photo' className='wallpaper-photo' style={ userWallpaper ? { backgroundImage: 'url('+userWallpaper+')'} : {} }>
        </div>
        <div id='profile-photo' className='profile-photo' style={ userPhoto ? { backgroundImage: 'url('+userPhoto+')', cursor: 'default'} : { cursor: 'default' }}>
        </div>
        </div>
        <div name='profile-form' id='profile-form' className='profile-form text-center'>
        <p className='font-weight-bold login-username'>{user.userName}</p>
        <p className='font-small text-secondary'>Joined {moment(user.joinDate).format('MMMM DD, YYYY')}</p>
        <div className='input-group mb-2 row'>
            <label class="col-2 col-form-label px14 text-left font-weight-bold mr-3">Email</label>
            <input type='text' className='form-control col-10' value={user.email} placeholder='Enter email' disabled/>
        </div>
        <div className='input-group mb-2 row'>
            <label class="col-2 col-form-label px14 text-left font-weight-bold mr-3">Name</label>
            <input type='text' className='form-control col-10' value={user.name} disabled/>
        </div>
        <div className='input-group mb-2 row'>
            <label class="col-2 col-form-label px14 text-left font-weight-bold mr-3">Birthday</label>
            <input type='date' className='form-control col-10' value={moment(user.birthDate).format('YYYY-MM-DD')} disabled/>
        </div>
        <div className='input-group mb-2 row'>
            <label class="col-2 col-form-label px14 text-left font-weight-bold mr-3">City</label>
            <input type='text' className='form-control col-10' value={user.city} disabled/>
            </div>
        <div className='input-group mb-2 row'>
            <label class="col-2 col-form-label px14 text-left font-weight-bold mr-3">State</label>
            <input type='text' className='form-control col-10' value={user.state} disabled/>
        </div>
        <div className='input-group mb-2 row'>
            <label class="col-2 col-form-label px14 text-left font-weight-bold mr-3">Bio</label>
            <textarea type='text' style={{ border: '1px solid #6c757d', borderRadius: '5px', height: '200px', resize: 'none' }} className='form-control' value={user.bio} disabled></textarea>
        </div>
        </div>
    </div>
    )
  } else {
    return (
      <>
        <span>Getting coffee...</span>
      </>
    )
  }
}

export default View
