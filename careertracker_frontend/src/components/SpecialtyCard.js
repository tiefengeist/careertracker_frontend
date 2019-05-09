import React from 'react';

const SpecialtyCard = props => {
  const {creator, creatorDisplay} = props;

  return (
    <div className="ui column">
 <div className="ui card"
      key={creator.id}>
      <div className="ui tiny image" key={creator}>
        <img src={props.creator.img} alt="creator image" onClick={(ev) => props.pickCreator(ev, creator)} />
      </div>
        <div className="content" id="content">
          <div className="header">
            {props.creator.name}

          </div>
            <div className="content" id="moviedescriptor" color="black">
              <div className="ul">
              {props.movies.map((movie) => {return <li><a onClick={(ev) => props.pickMovie(ev, movie)} className="description">{`in "${movie.title}" \n`}</a></li>})}
                </div>
            </div>


        </div>

      </div>


    </div>
  )
}


export default SpecialtyCard;
//
