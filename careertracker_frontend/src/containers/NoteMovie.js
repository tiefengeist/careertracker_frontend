import React from 'react'

class NoteMovie extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      note: 'Notes',
      contractForNotes: 'Notes'
    }
  }

  handleChange(e) {
    let change = {}
    change[e.target.name] = e.target.value
    this.setState(change)
  }


  getContract = () => {
    fetchRequest(`http://localhost:3000/api/v1/contracts/currentmovie`, 'post', {user_id: this.props.user.id, creator_id: this.props.selectedCreator.id, movie_id: this.props.movie.id}, this.props.token)
    .then(res => res.json())
    .then(json => {
      this.setState({contractForNotes: json, comment: json.film_comment})
      }
    )
  }

  submitChanges = (ev) => {
    ev.preventDefault();
    // console.log(typeof ev.target.commentContent.value)
    let commentContent = ev.target.commentContent.value
    fetchRequest(`http://localhost:3000/api/v1/contracts/${this.state.contractForNotes.id}`, 'put', {film_comment: commentContent}, this.props.token)
    .then(res => res.json())
    .then(json => console.log(json))
  }

  componentDidMount() {
    this.getContract()
  }

  componentDidUpdate() {
    this.getContract()
  }


  render() {
    let imageUrl =`https://image.tmdb.org/t/p/w500` + this.props.movie.poster_path
    return (
    <div className="ui container">
      <div className="ui segment">
        <div className="ui black three row grid">
          <div className="ui centered row">
          <div className="ui centered button icon" onClick={(ev) => this.props.toggleSelectedNoteMovie(ev)}>
            Go Back
          </div>
          </div>
          <div className="ui row">
            <div className="ui three column grid ">
              <div className="ui grid column">
                <div className="creator-name">
                  <h4 className="creatorName">{this.props.movie.title}</h4>
                </div>
                <div className="ui fluid image">
                  <div className="ui black ribbon label">
                    {this.props.movie.vote_average}
                  </div>
               <img src={this.props.movie.poster_path ? imageUrl : 'http://www.theprintworks.com/wp-content/themes/psBella/assets/img/film-poster-placeholder.png'} />}
                </div>
                <h3 className="ui bottom attached header">
                    {this.props.movie.release_date.slice(0, 4)}
                </h3>
              </div>
              <div className="ui grid column five wide">
              <div className="ui bio">
                {this.props.movie.overview}
                </div>
              </div>
              <div className="ui grid column six wide">
                <h4 className="ui header" id="textbox">
                  Your Notes
                </h4>
                <div className="ui raised segment" id="notedisplay">
                  <div className="content" id="mynotes">{this.state.contractForNotes.film_comment}</div>
                </div>

              </div>
            </div>
          </div>
          <div className="ui centered row">
            <form className="ui form" onSubmit={ev => this.submitChanges(ev)}>
                <div className="fields">
                  <div className="field" ><label id="textbox">
                    Alter Your Notes
                  </label><textarea width="500px" name="commentContent" placeholder={this.state.contractForNotes.film_comment} rows="9"></textarea></div>
                  <button class="ui button" type="submit">Submit</button>
                </div>
            </form>

          </div>
        </div>
      </div>
    </div>

  )
  }
}

export default NoteMovie;


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
