import React, { Component } from 'react'
import { BrowserRouter as Route, Link } from 'react-router-dom'
import profile from './Profile'

class Register extends Component {
    constructor (props) {
        super(props)
    
        this.state = {
          // Random images are titled with random numbers.
          array: ['9193245.png', 
                  '9123473.png', 
                  '9158477.png', 
                  '9172346.png', 
                  '9348576.png', 
                  '9376523.png', 
                  '9384574.png']
        }
      }
      componentDidMount () {
    
      }
      randomNumberGet () {
        return Math.floor(Math.random() * 6)
      }
    render () {
        let index = this.randomNumberGet()
        let icon = require('../icons/'+this.state.array[index])
      return (
          <header className='App-header'>
            <Link to='/'><img src={icon} className='App-logo' alt='logo' /></Link>
            <p>
              <Link to='/login' className='App-link'>Login</Link>
            </p>
            <form>
                <div className="form-group">
                    <input type="text" className="form-control" placeholder="username" />
                </div>
                <div className="form-group">
                    <input type="text" className="form-control" placeholder="first name" />
                </div>
                <div className="form-group">
                    <input type="email" className="form-control" placeholder="enter email" />
                </div>
                <div className="form-group">
                    <input type="password" className="form-control" placeholder="enter password" />
                </div>
                <div className="form-group">
                    <input type="password" className="form-control" placeholder="confirm password" />
                </div>
                <button type="submit" className="btn btn-primary btn-block">Register</button>
            </form>  
          </header>  
        )
    }
  }
  
  export default Register