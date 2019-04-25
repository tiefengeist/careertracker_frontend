import React from 'react';
import App from '../App';
import UserLogin from './UserLogin'
import Profile from './Profile'

class LandingPage extends React.Component {
  render() {
    let renderer;

    if(this.props.loggedIn === false) {
      renderer = <UserLogin logMeIn={this.props.logMeIn}/>
    } else {
      renderer = <Profile user={this.props.user} />
    }

    return (
      <div className="ui container">
      {renderer}
      </div>
    )
  }
}

export default LandingPage;
