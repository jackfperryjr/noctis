import React, { useState } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { HashRouter } from 'react-router-dom'
import { AuthContext } from './context/auth'
import PrivateRoute from './PrivateRoute'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import register from './components/Register'
import login from './components/Login'
import profile from './components/Profile'
import './App.css'

function App(props) {
  const existingToken = JSON.parse(localStorage.getItem('accessToken'))
  const [authToken, setAuthToken] = useState(existingToken)
  
  const setToken = (data) => {
    localStorage.setItem('accessToken', JSON.stringify(data))
    setAuthToken(data);
  }

  return (
    <AuthContext.Provider value={{ authToken, setAuthToken: setToken }}>
      <HashRouter basename={process.env.PUBLIC_URL}>
        <Route exact path='/' component={login} />
        <Route exact path='/login' component={login} />
        <Route exact path='/register' component={register} />
        <PrivateRoute exact path='/profile' component={profile} />
      </HashRouter>
    </AuthContext.Provider>
  )
}

export default App