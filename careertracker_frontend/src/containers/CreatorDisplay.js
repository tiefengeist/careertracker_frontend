import React from 'react'
import Card from '../components/Card'
import CreatorPage from './CreatorPage'
import UserLogin from './UserLogin'
import MovieDisplay from './MovieDisplay'
import {BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom';

class CreatorDisplay extends React.Component {

  componentWillUnmount() {
    this.props.toggleRedirect();
  }


  render() {
    let renderer;

        this.props.selectedCreator ?

          renderer =
          <div>
            <CreatorPage pickMovie={this.props.pickMovie} user={this.props.user} token={this.props.token} selectedMovie={this.props.selectedMovie} clearSelect={this.props.clearSelect} addCreator={this.props.addCreator} creator={this.props.selectedCreator} pickCreator={this.props.pickCreator} creatorMovies={this.props.creatorMovies}/>
            {this.props.creatorMovies ? <MovieDisplay token={this.props.token} clearSelect={this.props.clearSelect} toggleSelectedMovie={this.props.toggleSelectedMovie} pickMovie={this.props.pickMovie} selectedMovie={this.props.selectedMovie} creatorMovies={this.props.creatorMovies} /> : null}
          </div>

           :

          renderer =
            <div className="ui segment inverted white">
               <div className="ui four column grid">
                 {this.props.creators.map((creator, id) => {
                   return <Card creator={creator} pickCreator={this.props.pickCreator} key={id} />
                 })}
               </div>
             </div>



    return (
    <div>
      {renderer}
    </div>
    )
  }
}

export default CreatorDisplay
