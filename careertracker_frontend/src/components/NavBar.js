import React from 'react';
import {BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom';


class NavBar extends React.Component{



  render() {
    return (

      <div className="ui secondary  menu">

<Link to='/'> <a onClick={() => this.props.clearSelect()} className="active item">
    Home
  </a></Link>
  <Link to='/MyCreators'>
    <a onClick={() => this.props.toggleMyCreatorFalse()} className="item">My Creators</a>
  </Link>
  <div className="right menu">
    <div className="item">
      <div className="ui icon input">
        <form className="ui form" onSubmit={ev => this.props.getFilteredData(ev)}>
          <div className="fields" >
              <div className="field"><input type="text" name="creatorName" placeholder="Search"></input></div>
            <div className="field"><input type="submit" value="Submit"></input></div>
              </div>
          </form>
      </div>
    </div>
  <Link to='/Logout'>  <a className="item">
      Logout
    </a></Link>
  </div>
</div>
    )
  }
}

export default NavBar
