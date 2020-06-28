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
      let user = JSON.parse(sessionStorage.user);
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
          <img className='profile-photo' src={this.state.user.photo} alt={this.state.user.userName} />
          <p>{this.state.user.roleName}</p>
          <form>
            <div className='form-group'>
              <input type='text' className='form-control' value={this.state.user.userName} />
            </div>
            <div className='form-group'>
              <input type='text' className='form-control' value={this.state.user.firstName} />
            </div>
            <button type='submit' className='btn btn-primary btn-block' onClick={(e) => this.handleLogout(e)}>Logout</button>
          </form>
        </header>
      )
    } else {
      return <Redirect to="/noctis" />
    }
  }
}

export default Profile
