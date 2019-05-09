import React from 'react'
import MyMovieCard from '../components/MyMovieCard'
import MyMoviePage from './MyMoviePage'
import {BrowserRouter as Router, Link, Redirect} from 'react-router-dom';


class MovieNotesDisplay extends React.Component {
  constructor(){
    super();
    this.state = {
      updated: false,
      creatorNoteMovies: []
    }
}

    getContractMovies = () => {
      if (this.props.creatorNoteContracts.length > 0  && !this.state.updated ) {
      this.props.creatorNoteContracts.forEach((contract) => {
        if (contract.film_comment) {
          fetch(`https://api.themoviedb.org/3/movie/${contract.movie_id}?api_key=8c047ad16f4adffe431f0282012d22bc&language=en-US`)
          .then(res => res.json())
          .then(json => {
            let newCreatorNoteMovie = [...this.state.creatorNoteMovies, json]
            this.setState({
              creatorNoteMovies: newCreatorNoteMovie,
              updated: true,
            })}
          )
        } else {
          return null
        }
      })}
    }

    componentDidMount() {
      this.getContractMovies()
    }

    componentDidUpdate() {
      this.getContractMovies()
    }

    componentWillUnmount() {
      this.setState({updated: false})
    }

  render() {
    return (

      <div>
      <div className="ui segment raised">
        <div className="ui header">
          <h5>Your Notes</h5>
        </div>
        <div className="ui two column grid">
        {this.state.creatorNoteMovies.length > 0 ? this.state.creatorNoteMovies.map((movie, id) => {
          return <MyMovieCard  pickMovieNote={this.props.pickMovieNote}
                             movie={movie}
                             key={id} />
                         }) : null
        }

         </div>
       </div>
      </div>
    )

}

}

export default MovieNotesDisplay
