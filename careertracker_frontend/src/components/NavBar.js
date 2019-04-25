import React, { Component } from 'react'

class NavBar extends React.Component{
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        <ul id="nav">
          <li><div className="ui menu">
          <form className="ui form" onSubmit={ev => this.props.getFilteredData(ev)}>
              <input type="text" name="creatorName" placeholder="Search"></input>
              <input type="submit" value="Submit"></input>
          </form>
          </div>
          </li>
          <li>Lists</li>
          <li>My Creators</li>
          <li>My Profile</li>
        </ul>
      </div>
    )
  }
}

export default NavBar
