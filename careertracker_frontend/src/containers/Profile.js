import React from 'react'
import NavBar from '../components/NavBar'

class Profile extends React.Component {
  render() {
    return (
      <div>
      <NavBar getFilteredData={this.props.getFilteredData}/>
      <div className="ui three row grid">
      <div className="row">
      <h4 className="ui dividing header">{this.props.user.username}</h4>
      </div>
      </div>
      </div>
    )
  }

}

export default Profile
