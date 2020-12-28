# Noctis

Noctis is the user interface for chocoboAPI, the API used to manage user accounts across my personal projects (and maybe others in the future!).

### .NET Core 3.1 (.NET 5 in the near future!)

- WebAPI
- Using [ASP.NET Core Identity](https://docs.microsoft.com/en-us/aspnet/core/security/authentication/identity?view=aspnetcore-5.0&tabs=visual-studio)
- Hosted in Azure

### Endpoints

https://chocobo.moogleapi.com/v1/account/register     
https://chocobo.moogleapi.com/v1/account/login  
https://chocobo.moogleapi.com/v1/account/logout (Outdated)  
https://chocobo.moogleapi.com/v1/account/refresh  

https://chocobo.moogleapi.com/v1/manage/delete  
https://chocobo.moogleapi.com/v1/manage/update       

##### *See [Swagger](https://chocobo.moogleapi.com/swagger/index.html) for more

Then use that data in your website, webpage, or application!

### Examples

#### JavaScript (stripped down example using fetch)

```javascript
function handleLogin() {
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
        localStorage.setItem('refreshToken', JSON.stringify(response.refreshToken))
        setAuthToken(response.accessToken)
      } else {
        console.log(response.message)
      }
    })
  }
```
    
### Login and Register responses contain:

- User object (containing typical Identity properties as well as some additional)
 * Example (without user ID or tokens):  
 
 ```json
{
  "message": "User logged in successfully.",
  "accessToken": "...",
  "refreshToken": "...",
  "expiration": "2020-12-28T19:35:49Z",
  "user": {
    "id": "...",
    "userName": "jackfperryjr",
    "email": "jackfperryjr@gmail.com",
    "firstName": "Jack",
    "lastName": "Perry, Jr",
    "city": "Louisville",
    "state": "KY",
    "country": null,
    "birthDate": "1982-03-03T00:00:00",
    "age": 38,
    "roleName": "Admin",
    "joinDate": "2020-01-07T13:02:22.749582",
    "photos": [
      {
        "id": "605fea4e-d15c-409d-a3f8-ca8e21a56dfd",
        "url": "https://rikku.blob.core.windows.net/wallpaper/605fea4e-d15c-409d-a3f8-ca8e21a56dfd.png",
        "portrait": 0,
        "wallpaper": 1,
        "timestamp": "2020-12-24T15:54:02.23",
        "userId": "..."
      },
      {
        "id": "e8aec94e-8c5b-4c8a-8320-f6423866fe86",
        "url": "https://rikku.blob.core.windows.net/portrait/e8aec94e-8c5b-4c8a-8320-f6423866fe86.png",
        "portrait": 1,
        "wallpaper": 0,
        "timestamp": "2020-12-24T14:34:17.78",
        "userId": "..."
      }
    ]
  }
}
 ```
- Access Token
- Refresh Token 
