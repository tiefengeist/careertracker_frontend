import React from 'react'
import MyCreatorCard from '../components/MyCreatorCard'
import MyCreatorPage from './MyCreatorPage'
import NoteMovie from './NoteMovie'
import UserLogin from './UserLogin'
import MyMovieDisplay from './MyMovieDisplay'
import {BrowserRouter as Router, Link, Redirect} from 'react-router-dom';

// <MovieDisplay creatorMovies={this.props.creatorMovies} />
class MyCreatorDisplay extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      loggedIn: false,
      creators: [],
      myCreators: '',
      user: {},
      searchName: '',
      redirect: false,
      selectedCreator: '',
      selectedMovie: '',
      creatorNoteContracts: [],
      creatorNoteMovies: [],
      selectedNoteMovie: ''
    }
  }

  getMyData = () => {

    fetchRequest(`http://localhost:3000/api/v1/creators/currentuser`, 'post', {user_id: this.props.user.id}, this.props.token)
    .then(res => res.json())
    .then(json => {
      this.setState({myCreators: json})
    })



    this.props.toggleRedirect();
    // this.setState({selectedCreator: ''})
  }

  unSelectCreator = () => {
    this.setState({
      selectedCreator: ''
    })
  }

  pickMovie = (ev, movie) => {

    fetch(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=8c047ad16f4adffe431f0282012d22bc&language=en-US`)
    .then(res => res.json())
    .then(json =>
      this.setState({
        selectedMovie: json
      }))
  }

  pickMyCreator = (ev, creator) => {
    console.log('picking')
    fetchRequest(`http://localhost:3000/api/v1/creators/${creator.id}`, 'get', {}, this.props.token)
    .then(res => res.json())
    .then(json =>
      this.setState({
        selectedCreator: json
      })
    )
    // .then(this.props.toggleMyCreator())


    fetchRequest(`http://localhost:3000/api/v1/contracts/currentcreator`, 'post', {user_id: this.props.user.id, creator_id: creator.id}, this.props.token)
    .then(res => res.json())
    .then(json => {
      this.setState({creatorNoteContracts: json})
    }
  )

    fetch(`https://api.themoviedb.org/3/person/${creator.id}/movie_credits?api_key=8c047ad16f4adffe431f0282012d22bc&language=en-US`)
    .then(res => res.json())
    .then(json =>
      this.setState({
        creatorMovies: json
      })
    )


    // this.props.toggleMyCreator();
  }

  pickMovieNote = (ev, movie) => {

    fetch(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=8c047ad16f4adffe431f0282012d22bc&language=en-US`)
    .then(res => res.json())
    .then(json =>
      this.setState({
        selectedNoteMovie: json
      })
    )
  }

  toggleSelectedMovie = (ev) => {
    this.setState({
      selectedMovie: ''
    })
  }

  toggleSelectedNoteMovie = (ev) => {
    this.setState({
      selectedNoteMovie: ''
    })
  }

  componentDidMount() {
    window.scrollTo(0,0);
    this.getMyData();

  }

  componentWillUnmount() {
    this.props.toggleRedirect();
  }


  render() {

    let renderer;

    this.state.selectedNoteMovie ?

    renderer = <NoteMovie token={this.props.token} toggleSelectedNoteMovie={this.toggleSelectedNoteMovie} user={this.props.user} selectedCreator={this.state.selectedCreator} movie={this.state.selectedNoteMovie} />

      :

        this.state.selectedCreator

         ?

          renderer =
          <div className="ui segment inverted white">
            <MyCreatorPage pickMovieNote={this.pickMovieNote} creatorNoteContracts={this.state.creatorNoteContracts} selectedMovie={this.state.selectedMovie} creator={this.state.selectedCreator} creatorMovies={this.state.creatorMovies}/>
            {this.state.creatorMovies ? <MyMovieDisplay unSelectCreator={this.unSelectCreator} token={this.props.token} toggleSelectedNoteMovie={this.toggleSelectedNoteMovie} selectedCreator={this.state.selectedCreator} user={this.props.user} selectedMovie={this.state.selectedMovie} toggleSelectedMovie={this.toggleSelectedMovie} pickMovie={this.pickMovie} creatorMovies={this.state.creatorMovies} /> : null}
          </div>

           :

          renderer =
            <div className="ui segment inverted white">
               <div className="ui four column grid">
                 {this.state.myCreators ? this.state.myCreators.map((creator, id) => {
                   return <MyCreatorCard creator={creator} pickCreator={this.pickMyCreator} key={id} />
                 }) : null}
               </div>
             </div>



    return (
    <div>
    {this.props.redirect ? <Redirect to='/Creators' /> : null}
      {renderer}
    </div>
    )
  }
}

export default MyCreatorDisplay

function fetchRequest(URL, method, data={}, authorizer) {
  const initial = {headers: {
    'Authorization': `Bearer ` + authorizer,
    'Content-Type': 'application/json',
    'Accept': 'application/json'
    },
    method: method,
    body: JSON.stringify(data)
  }
                if (method.toLowerCase() === 'get') delete initial.body;
                  else if (method.toLowerCase() === 'post' && initial.body.id) delete initial.body.id
                return fetch(URL, initial);
}
