import React from 'react';

const MyCreatorCard = props => {
  const {creator, creatorDisplay} = props;
  let imageUrl = creator.img;

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
          <img src={creator.img ? imageUrl : 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'} alt="creator image"/>
          </div>
        </div>
      </div>

      </div>
    </div>
  )
}

export default MyCreatorCard
