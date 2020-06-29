import React, { Component } from 'react'
import { BrowserRouter as Route, Link, Redirect} from 'react-router-dom'

class Profile extends Component {
  constructor (props) {
    super(props)

    this.state = {
      success: false,
      user: {}
    }
  }

  componentWillMount () {
    document.getElementById('overlay').style.display = 'none'
    if (sessionStorage.token) {
      let user = JSON.parse(sessionStorage.user)
      this.setState({
        success: true,
        user: user
      })
    }
  }

  handleLogout (e) {
    document.getElementById('overlay').style.display = 'none'
    sessionStorage.clear()
    this.props.history.push('/noctis')
  }

  render () {
    if (this.state.success === true) {
      return (
        <header className='form-container'>
          <div className='profile-container'>
            <img className='wallpaper-photo' src={this.state.user.wallpaper} alt={this.state.user.userName} />
            <img className='profile-photo' src={this.state.user.photo} alt={this.state.user.userName} />
          </div>
          <p>{this.state.user.roleName}</p>
          <form>
            <div className='form-group'>
              <input type='text' className='form-control' value={this.state.user.userName} />
            </div>
            <div className='form-group'>
              <input type='text' className='form-control' value={this.state.user.firstName} />
            </div>
            <div className='button-container'>
              <button type='submit' className='btn btn-primary' onClick={(e) => this.handleLogout(e)}>Logout</button>
              <button type='submit' className='btn btn-success'>Update</button>
              <button type='submit' className='btn btn-danger'>Delete Account</button>
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
