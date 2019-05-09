import React from 'react'

class MoviePage extends React.Component {



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
              <img src={this.props.movie.poster_path ? imageUrl : 'http://www.theprintworks.com/wp-content/themes/psBella/assets/img/film-poster-placeholder.png'} alt="empty profile"/>
              </div>
              <h3 class="ui bottom attached header">
                  {this.props.movie.release_date ? this.props.movie.release_date.slice(0, 4) : null}
              </h3>
            </div>
            <div className="ui grid column nine wide">
            <div className="ui bio">
              {this.props.movie.overview}
              </div>
            </div>
            <div className="ui grid column">
              <div className="add-button">
                Add This Creator
              </div>
              <div className="ui button icon" onClick={(ev) => this.props.toggleSelectedMovie(ev)}>
                Go Back
              </div>
            </div>
          </div>
        </div>
      <div className="ui row">

      </div>
        </div>
      </div>
    </div>

  )
  }
}

export default MoviePage
