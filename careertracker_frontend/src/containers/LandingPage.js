import React from 'react';
import UserLogin from './UserLogin'
import Profile from './Profile'
import {BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom';


class LandingPage extends React.Component {
  render() {
    let renderer;

    if(this.props.loggedIn === false) {
      renderer = <UserLogin logMeIn={this.props.logMeIn}
                            findYourUser={this.props.findYourUser}/>
    } else {
      renderer = <Profile user={this.props.user}
      token={this.props.token}
      getFilteredData={this.props.getFilteredData}
      toggleRedirect={this.props.toggleRedirect}
      toggleSelectedMovie={this.props.toggleSelectedMovie}
      pickMovie={this.props.pickMovie}
      selectedMovie={this.props.selectedMovie}
      addCreator={this.props.addCreator}
      creatorMovies={this.props.creatorMovies}
      selectedCreator={this.props.selectedCreator}
      clearSelect={this.props.clearSelect}
      pickCreator={this.props.pickCreator}
       />
    }

    return (
      <div className="ui container">
      {this.props.redirect ? <Redirect to='/Creators' /> : null}
      {renderer}
      </div>
    )
  }
}

export default LandingPage;
