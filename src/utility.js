export function refresh (accessToken) {
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