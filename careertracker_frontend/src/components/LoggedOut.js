import React from 'react';
import {BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom';

class LoggedOut extends React.Component{

  componentWillUnmount() {
    this.props.logMeOut()
  }

  render() {
    return (
      <div>
      <h1 color="black">Successfully Logged Out...</h1>
      <Link to='/'><p>Click here to return to Login</p></Link>
      </div>
    )
  }

}

export default LoggedOut
