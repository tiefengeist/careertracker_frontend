import React from 'react';

const Card = props => {
  const {creator, creatorDisplay} = props;
  let imageUrl =`https://image.tmdb.org/t/p/w300` + props.creator.profile_path;

  return (
    <div className="ui column">
    <div className="card-in-creatordisplay">
 <div className="ui card"
      key={creator.id}

      onClick={(ev) => props.pickCreator(ev, creator)}
      >
        <div className="content" id="content">
          <div className="header">
          {props.creator.name}
          </div>
          <div className="ui image" key={creator}>
          <img src={props.creator.profile_path ? imageUrl : 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'} alt="creator image"/>
          </div>
        </div>
      </div>

      </div>
    </div>
  )
}

// <p>
//   {this.state.creators.map((creator, id) => {
//     return   <Card creator={creator} id={id}/>
//   })}
// </p>


// onClick ==> Pass down creator={props.creator}
export default Card;
