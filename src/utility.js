export function refreshTokens(accessToken) {
    let refreshToken = JSON.parse(localStorage.refreshToken)
    fetch('https://chocobo.moogleapi.com/v1/account/refresh', {
        method: 'post',
        headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken
          },
        body: JSON.stringify(refreshToken)
      }).then(response => response.json())
        .then(function(response) {
            localStorage.setItem('accessToken', JSON.stringify(response.accessToken))
            localStorage.setItem('refreshToken', JSON.stringify(response.refreshToken))
    })
}

export function refreshUser() {
  let user = JSON.parse(localStorage.user)
  fetch('https://chocobo.moogleapi.com/v1/manage/get/' + user.userName, {
      method: 'get'
    }).then(response => response.json())
      .then(function(response) {
          localStorage.setItem('user', JSON.stringify(response))
  })
}

export function dismiss() {
  document.getElementById('update-notification').style.display = 'none'
}

export function handleUserDelete() {
  document.getElementById('overlay').style.display = 'none'
  console.log('user deleted')
}

export function handleUserPhotoUpload() {
  document.getElementById('upload-photo').click()
}

export function handleUserWallpaperUpload() {
  document.getElementById('upload-wallpaper').click()
}

export function getUserPhoto(user) {
  let portraits = user.photos.filter(function(e){
    return e.portrait === 1
  })

  if (portraits.length > 0) {
    return portraits[0].url
  } else {
    return ''
  }
}

export function getUserWallpaper(user) {
  let wallpapers = user.photos.filter(function(e){
    return e.wallpaper === 1
  })

  if (wallpapers.length > 0) {
    return wallpapers[0].url
  } else {
    return ''
  }
}