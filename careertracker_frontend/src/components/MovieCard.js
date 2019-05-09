import React from 'react';


//onClick={(ev) => props.pickMovie(ev, creator)

const MovieCard = props => {
  const {movie, movieDisplay} = props;
  let imageUrl =`https://image.tmdb.org/t/p/w300` + props.movie.poster_path;

  return (
    <div className="ui column">
    <div className="card-in-creatordisplay">
 <div className="ui card fluid eq-card"
      key={movie.id}

      onClick={(ev) => props.pickMovie(ev, movie)}
      >
        <div className="content" id="content">
          <div className="ui centered dividing header">
          <h5>{props.movie.title}</h5>
          <h6>{props.movie.character ? props.movie.character : props.movie.job}</h6>
          </div>
          <div className="ui image" key={movie}>
          <img src={props.movie.poster_path ? imageUrl : 'http://www.theprintworks.com/wp-content/themes/psBella/assets/img/film-poster-placeholder.png'} />
          </div>
        </div>
      </div>

      </div>
    </div>
  )
}

export default MovieCard
