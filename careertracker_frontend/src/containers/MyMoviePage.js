import React from 'react'

class MyMoviePage extends React.Component {

  persistNotes = (ev) => {
    ev.preventDefault();
    let sc = this.props.selectedCreator;
     let content = {
        id: this.props.movie.id,
        name: this.props.movie.title,
        summary: this.props.movie.overview,
        poster_img: this.props.movie.poster_path
      }

      let contractData = {
        user_id: this.props.user.id,
        movie_id: this.props.movie.id,
        creator_id: sc.id,
        film_comment: ev.target.film_comment.value
      }

        let fetcher = () => fetchRequest(`http://localhost:3000/api/v1/contracts/`, 'post', contractData, this.props.token)
          .then(res => res.json())
          .then(json => console.log(json))

          fetchRequest(`http://localhost:3000/api/v1/movies/`, 'post', content, this.props.token)
            .then(() => {
              fetcher()
              }
            )
            .then(this.props.toggleSelectedMovie)

            this.props.unSelectCreator()
  }

  render() {
    let imageUrl =`https://image.tmdb.org/t/p/w500` + this.props.movie.poster_path;
    return (
    <div className="ui container">
      <div className="ui segment">
        <div className="ui black two row grid">
        <div className="ui row">
          <div className="ui three column grid ">
            <div className="ui grid column">
              <div className="creator-name">
                <h4 className="creatorName">{this.props.movie.title}</h4>
              </div>
              <div className="ui fluid image">
                <div class="ui black ribbon label">
                  {this.props.movie.vote_average}
                </div>
              <img src={this.props.movie.poster_path ? imageUrl : 'http://www.theprintworks.com/wp-content/themes/psBella/assets/img/film-poster-placeholder.png'} />
              </div>
              <h3 class="ui bottom attached header">
                  {this.props.movie.release_date.slice(0, 4)}
              </h3>
            </div>
            <div className="ui grid column nine wide">

            <div className="ui bio">
              {this.props.movie.overview}
              </div>
              <h4 className="ui header" id="textbox">
                Notes on this Performance
              </h4>


                <form className="ui form" onSubmit={ev => this.persistNotes(ev)}>
                    <div className="fields">
                      <div className="field" ><textarea width="700px" name="film_comment" placeholder="Notes..." rows="9"></textarea></div>
                      <button class="ui button" type="submit">Submit</button>
                    </div>
                </form>



            </div>
            <div className="ui grid column seven wide">
            </div>
          </div>
        </div>
      <div className="ui centered row">
        <div className="ui button icon" onClick={(ev) => this.props.toggleSelectedMovie(ev)}>
          Go Back
        </div>
      </div>
        </div>
      </div>
    </div>
    )
  }
}


// <form className="ui form" onSubmit={ev => this.persistNotes(ev)}>
//     <div className="fields">
//       <div className="field" ><input type="textarea" rows="16" name="film_comment" placeholder="Notes..."></input></div>
//       <div className="field"><input type="submit"  value="Submit"></input></div>
//     </div>
// </form>

export default MyMoviePage;

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
