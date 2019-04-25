import React from 'react'

const Card = props => {
  const {creator} = props;
  let imageUrl =`https://image.tmdb.org/t/p/w300` + props.creator.profile_path;

  return (
    <div className = "ui column">
      <div className="ui card"
      key={creator.id}>
        <div className="content" id="content">
          <div className="header">
          {props.creator.name}
          </div>
          <div className="ui image">
          <img src={imageUrl} alt="creator image"/>
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

export default Card;
