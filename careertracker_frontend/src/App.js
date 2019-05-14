import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route, Link, Redirect} from 'react-router-dom';
import LandingPage from './containers/LandingPage';
import CreatorDisplay from './containers/CreatorDisplay';
import MyCreatorDisplay from './containers/MyCreatorDisplay';
import NavBar from './components/NavBar';
import CreatorPage from './containers/CreatorPage';
import LoggedOut from './components/LoggedOut';

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      loggedIn: false,
      creators: [],
      myCreators: [],
      user: {},
      searchName: '',
      redirect: false,
      selectedCreator: '',
      selectedMovie: '',
      overlap: []
    }
  }

  getData = () => {
  return fetch('https://api.themoviedb.org/3/search/person?api_key=8c047ad16f4adffe431f0282012d22bc&language=en-US&query=lee&page=1&include_adult=false')
  .then(res => res.json())
  .then(json =>
    this.setState({
    creators: json['results']
    }))
  }

  unSelectCreator = () => {
    this.setState({
      selectedCreator: ''
    })
  }

  toggleMyCreator = () => {
    this.setState({
      myCreatorsToggle: true
    })
  }

  toggleMyCreatorFalse = () => {
    this.setState({
      myCreatorsToggle: false
    })
  }

  toggleRedirect = () => {
    if (this.state.redirect) {this.setState({redirect: false})}
  }

  getFilteredData = (ev) => {

    ev.preventDefault();
    let searchName = ev.target.creatorName.value

    if (this.state.loggedIn === true && searchName){

      fetch(`https://api.themoviedb.org/3/search/person?api_key=8c047ad16f4adffe431f0282012d22bc&language=en-US&query=${searchName}&page=1&include_adult=false`)
      .then(res => res.json())
      .then(json =>
      this.setState({
        creators: json['results'],
        redirect: true,
        selectedCreator: false
      })
    );
    }
    else {alert("Please enter a search term")}
  }


  componentDidMount() {
    this.getData();
    this.clearSelect()
  }

  clearSelect = () => {
    console.log('hitting')
    if (this.state.selectedCreator) {
    this.setState({
      selectedCreator: '',
      selectedMovie: '',
      searchName: ''
    })
  }
  }

  pickCreator = (ev, creator) => {
    fetch(`https://api.themoviedb.org/3/person/${creator.id}?api_key=8c047ad16f4adffe431f0282012d22bc&language=en-US`)
    .then(res => res.json())
    .then(json =>
      this.setState({
        selectedCreator: json,
        redirect: false
      })
    )

    fetch(`https://api.themoviedb.org/3/person/${creator.id}/movie_credits?api_key=8c047ad16f4adffe431f0282012d22bc&language=en-US`)
    .then(res => res.json())
    .then(json =>
      this.setState({
        creatorMovies: json
      })
    )
  }

  pickMovie = (ev, movie) => {
    fetch(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=8c047ad16f4adffe431f0282012d22bc&language=en-US`)
    .then(res => res.json())
    .then(json =>
      this.setState({
        selectedMovie: json
      })
    )
  }

  toggleSelectedMovie = (ev) => {
    this.setState({
      selectedMovie: ''
    })
  }

  pickMyCreator = (ev, creator) => {
    fetch(`http://localhost:3000/creators/${creator.id}`)
    .then(res => res.json())
    .then(json =>
      this.setState({
        selectedCreator: json
      }))
  }

  setUser = () => {
    if (this.state.user.error) {alert('user not created')}
  }

  logMeIn = (ev) => {
    ev.preventDefault()
    let uservalue = ev.target.userName.value
    let passwordvalue = ev.target.password.value
    let data = {user : {
      username: uservalue,
      password: passwordvalue}
    }
    if (passwordvalue === '') {alert('Enter a valid password')}
    fetchRequestInit('http://localhost:3000/api/v1/users/', 'post', data)
    .then(res => res.json())
    .then(json =>
      json.user ?
      this.setState({
        user: json.user.user,
        token: json.jwt,
        loggedIn: true
    })
    : alert('This user already exists. Proceed to the Login page.')
  )
  }

  findYourUser = (ev) => {
    ev.preventDefault();
    console.log('findan')
    let uservalue = ev.target.loginuserName.value
    let passwordvalue = ev.target.loginpassword.value
    let data = {user : {
      username: uservalue,
      password: passwordvalue}
      }
    if (passwordvalue === '') {alert('Enter a valid password')}
        fetchRequestInit('http://localhost:3000/api/v1/auth/', 'post', data)
        .then(res => res.json())
        .then(json =>
          json.user ?
          this.setState({
            user: json.user,
            token: json.jwt,
            loggedIn: true
            })
    : alert('This user does not exist.')
      )
  }

  logMeOut = () => {

    this.setState({user: '',
                   loggedIn: false
    })

  }

  addCreator = (ev) => {

    console.log(this.state.selectedCreator)
    let sc = this.state.selectedCreator;
    let imageUrl = `https://image.tmdb.org/t/p/w300` + sc.profile_path
    let creatorData = {
      id: sc.id,
      name: sc.name,
      specialty: sc.known_for_department,
      birthday: sc.birthday,
      bio: sc.biography,
      avg_rating: sc.popularity,
      img: imageUrl
    }
    let fanPageData = {
      user_id: this.state.user.id,
      creator_id: sc.id
    }
    this.setState(creatorData)
    fetchRequest(`http://localhost:3000/api/v1/creators`, 'post', creatorData, this.state.token)
    .then(res => res.json())
    .then(json => console.log(json))

    fetchRequest(`http://localhost:3000/api/v1/fan_pages`, 'post', fanPageData, this.state.token)
    .then(res => res.json())
    .then(json => console.log('fanpagepost'))

    this.setState({selectedCreator: ''})
  }


  render() {
    return (
      <Router>
      <div className="App">
        { this.state.loggedIn ? <NavBar toggleMyCreatorFalse={this.toggleMyCreatorFalse} myCreatorsToggle={this.state.myCreatorsToggle} clearSelect={this.clearSelect} logOutMsg={this.state.logOutMsg} logMeOut={this.logMeOut} getFilteredData={this.getFilteredData}/> : null}

          <Switch>
            <header className="App-header">

              <Route exact path='/' component={() => <LandingPage token={this.state.token} clearSelect={this.clearSelect} toggleRedirect={this.toggleRedirect} toggleSelectedMovie={this.toggleSelectedMovie} pickMovie={this.pickMovie} selectedMovie={this.state.selectedMovie} addCreator={this.addCreator} findYourUser={this.findYourUser} unSelectCreator={this.unSelectCreator} selectedCreator={this.state.selectedCreator} pickCreator={this.pickCreator} redirect={this.state.redirect} getFilteredData={this.getFilteredData} creatorMovies={this.state.creatorMovies} user={this.state.user} logMeIn={this.logMeIn} loggedIn={this.state.loggedIn} creators={this.state.creators} />}/>
              <Route path= '/Creators' component={() =>   <div className="ui segment"><CreatorDisplay token={this.state.token} user={this.state.user} clearSelect={this.clearSelect} toggleRedirect={this.toggleRedirect} toggleSelectedMovie={this.toggleSelectedMovie} pickMovie={this.pickMovie} selectedMovie={this.state.selectedMovie} addCreator={this.addCreator} unSelectCreator={this.unSelectCreator} creatorMovies={this.state.creatorMovies} selectedCreator={this.state.selectedCreator} pickCreator={this.pickCreator} creators={this.state.creators}/></div>}/>
              <Route path= '/MyCreators' component={() =>   <div className="ui segment"><div id="trending-header" className="header"><h1>Your Creators</h1></div><MyCreatorDisplay token={this.state.token} myCreatorsToggle={this.state.myCreatorsToggle} toggleMyCreator={this.toggleMyCreator} user={this.state.user} getFilteredData={this.getFilteredData} toggleRedirect={this.toggleRedirect} myCreatorMovies={this.state.creatorMovies} selectedCreator={this.state.selectedCreator} redirect={this.state.redirect} myCreators={this.state.myCreators}/></div>}/>
              <Route path= '/Logout' component={() => <div><LoggedOut logMeOut={this.logMeOut} /></div>}/>
            </header>
          </Switch>
          </div>
        </Router>
    )
  }
}

export default App;

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
                  else if (method.toLowerCase() === 'post' && initial.body.id) delete initial.body.id;
                return fetch(URL, initial);
}

function fetchRequestInit(URL, method, data={}) {
  const initial = {headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
    },
    method: method,
    body: JSON.stringify(data)
  }
                if (method.toLowerCase() === 'get') delete initial.body;
                  else if (method.toLowerCase() === 'post' && initial.body.id) delete initial.body.id;
                return fetch(URL, initial);
}
