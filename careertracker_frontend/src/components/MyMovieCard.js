import React from 'react';


//onClick={(ev) => props.pickMovie(ev, creator)

const MyMovieCard = props => {
  const {movie, movieDisplay} = props;
  let imageUrl =`https://image.tmdb.org/t/p/w300` + props.movie.poster_path;

  return (
    <div className="ui column">
    <div className="card-in-mycreatordisplay">
 <div className="ui fluid card tiny eq-card"
      key={movie.id}

      onClick={(ev) => props.pickMovieNote(ev, movie)}
      >
        <div className="content" id="content">
          <div className="ui centered dividing header">
          <h6>{props.movie.title}</h6>
          </div>
          <div className="ui fluid image" key={movie}>
          <img src={props.movie.poster_path ? imageUrl : 'http://www.theprintworks.com/wp-content/themes/psBella/assets/img/film-poster-placeholder.png'} />
          </div>
        </div>
      </div>

      </div>
    </div>
  )
}

export default MyMovieCard
