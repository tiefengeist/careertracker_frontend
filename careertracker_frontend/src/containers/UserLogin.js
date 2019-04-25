import React from 'react'

class UserLogin extends React.Component {
  render() {
    return (
      <div className="ui segment">
      <form className="ui form" onSubmit={ev => this.props.logMeIn(ev)}>
      <h4 className="ui dividing header">Enter User Credentials </h4>
        <div className="field">
          <input type="text" name="userName" placeholder="Enter Username"/>
        </div>
        <div className="field">
          <input type="password" name="password" placeholder="Enter Password"/>
        </div>
          <button className="ui button" type="submit">Submit</button>
      </form>
      </div>
    )
  }

}

export default UserLogin
