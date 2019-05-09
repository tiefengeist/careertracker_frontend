import React from 'react'
import Card from '../components/Card'
import CreatorPage from './CreatorPage'
import UserLogin from './UserLogin'
import MovieDisplay from './MovieDisplay'
import {BrowserRouter as Router, Link, Redirect} from 'react-router-dom';

// <MovieDisplay creatorMovies={this.props.creatorMovies} />
class TrendingCreatorDisplay extends React.Component {

  componentDidUpdate(prevProps) {
    if (this.props.selectedCreator !== prevProps.selectedCreator)
    {this.props.clearSelect()}
  }


  render() {

    let renderer;



        this.props.selectedCreator ?

          renderer =
          <div>
            <CreatorPage pickMovie={this.props.pickMovie} token={this.props.token} user={this.props.user} pickCreator={this.props.pickCreator} selectedMovie={this.props.selectedMovie} addCreator={this.props.addCreator} creator={this.props.selectedCreator} creatorMovies={this.props.creatorMovies}/>
            {this.props.creatorMovies ? <MovieDisplay toggleSelectedMovie={this.props.toggleSelectedMovie} pickMovie={this.props.pickMovie} selectedMovie={this.props.selectedMovie} creatorMovies={this.props.creatorMovies} /> : null}
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

export default TrendingCreatorDisplay
