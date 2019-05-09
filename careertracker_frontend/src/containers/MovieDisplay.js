import React from 'react'
import MovieCard from '../components/MovieCard'
import MoviePage from './MoviePage'
import {BrowserRouter as Router, Link, Redirect} from 'react-router-dom';


class MovieDisplay extends React.Component {

  sortedFilmsCast = this.props.creatorMovies.cast.sort(
    (a, b) => (a.release_date > b.release_date) ? 1 : -1
  )

  sortedFilmsCrew = this.props.creatorMovies.crew.sort(
    (a, b) => (a.release_date > b.release_date) ? 1 : -1
  )



  render() {

    let renderer;

    if (!this.props.selectedMovie)

    {renderer =

    <div className="ui segment white">
      <div className="ui header">
        <h1>Credits (in Order of Release)</h1>
      </div>
      <div className="ui two column grid">
        <div className="ui column">
      <div className="ui segment raised">
        <h4 class="ui header">As Cast</h4>
      <div className="ui three column grid">
         {this.props.creatorMovies.cast.map((movie, id) => {
           return <MovieCard  pickMovie={this.props.pickMovie}
                              movie={movie}
                              key={id} />
                          })
       }

       </div>
     </div>
   </div>
   <div className="ui column">
       <div className="ui segment raised">
         <h4 class="ui header">As Crew</h4>
       <div className="ui three column grid">
          {this.props.creatorMovies.crew.map((movie, id) => {
            return <MovieCard  pickMovie={this.props.pickMovie}
                               movie={movie}
                               key={id} />
                           })
           }
         </div>
        </div>
        </div>
       </div>
     </div>
   }
     else {
       renderer = <MoviePage movie={this.props.selectedMovie} toggleSelectedMovie={this.props.toggleSelectedMovie} />
            }




    return (

      <div>
        {renderer}
      </div>
    )

}

}

export default MovieDisplay
