import React, { Component } from 'react'

class Register extends Component {
    constructor (props) {
        super(props)
    
        this.state = {}
      }
    componentDidMount () {

    }
    render () {
      return (
            <form style={{marginBottom: 52}}>
                <h3>Register</h3>

                <div className="form-group">
                    {/* <label>First name</label> */}
                    <input type="text" className="form-control" placeholder="Username" />
                </div>

                <div className="form-group">
                    {/* <label>Last name</label> */}
                    <input type="text" className="form-control" placeholder="First name" />
                </div>

                <div className="form-group">
                    {/* <label>Email address</label> */}
                    <input type="email" className="form-control" placeholder="Enter email" />
                </div>

                <div className="form-group">
                    {/* <label>Password</label> */}
                    <input type="password" className="form-control" placeholder="Enter password" />
                </div>

                <div className="form-group">
                    {/* <label>Password</label> */}
                    <input type="password" className="form-control" placeholder="Confirm password" />
                </div>

                <button type="submit" className="btn btn-primary btn-block">Register</button>
                {/* <p className="forgot-password text-right" style={{marginTop:30}}>
                    Already registered? <a className="App-link" href="#">Login.</a>
                </p> */}
            </form>    
        )
    }
  }
  
  export default Register