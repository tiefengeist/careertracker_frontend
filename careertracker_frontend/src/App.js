import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import LandingPage from './containers/LandingPage';
import CreatorDisplay from './containers/CreatorDisplay';
import NavBar from './components/NavBar'

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      loggedIn: false,
      creators: [],
      user: {},
      searchName: '',
      redirect: false
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

  getFilteredData = (ev) => {
    ev.preventDefault();
    let searchName = ev.target.creatorName.value

    if (this.state.loggedIn === true)

    {fetch(`https://api.themoviedb.org/3/search/person?api_key=8c047ad16f4adffe431f0282012d22bc&language=en-US&query=${searchName}&page=1&include_adult=false`)
    .then(res => res.json())
    .then(json =>
      this.setState({
        creators: json['results'],
        redirect: true
      })
    )}
    else {alert("Please log in to search")}
  }


  componentDidMount() {
    this.getData()
  }

  logMeIn = (ev) => {
    ev.preventDefault()
    let uservalue = ev.target.userName.value
    let passwordvalue = ev.target.password.value
    let data = {
      username: uservalue,
      password: passwordvalue
    }
    this.setState(data)
    this.setState({loggedIn: true})
    fetchRequest('http://localhost:3000/api/v1/users/', 'post', data)
    .then(res => res.json())
    .then(json =>
      this.setState({
        user: json
    }))
  }


  render() {
    // if (this.state.redirect === false) {
    return (
      <div className="App">
        <Router>
          <Switch>
            <header className="App-header">
              <Route exact path='/' component={() => <LandingPage getFilteredData={this.getFilteredData} user={this.state.user} logMeIn={this.logMeIn} loggedIn={this.state.loggedIn} creators={this.state.creators} />}/>
              <Route path= '/Creators' component={() =>   <div className="ui segment"><NavBar getFilteredData={this.getFilteredData}/><CreatorDisplay creators={this.state.creators}/></div>}/>
            </header>
          </Switch>
        </Router>
      </div>
    );
    // else {return (<div>TEST</div>)}
  }
}


export default App;

function fetchRequest(URL, method, data={}) {
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

//<Link to='./Creators'>  </Link>
