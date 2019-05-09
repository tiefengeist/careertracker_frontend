import React from 'react'
import MovieNotesDisplay from './MovieNotesDisplay'

class MyCreatorPage extends React.Component {

  render() {
    let imageUrl = this.props.creator.img;
    return (
    <div className="ui container">
      <div className="ui segment">
        <div className="ui black two row grid">
        <div className="ui row">
          <div className="ui three column grid ">
            <div className="ui grid column">
              <div className="creator-name">
                <h4 className="creatorName">{this.props.creator.name}</h4>
              </div>
              <div className="ui image">
              {this.props.creator.img ? <img src={imageUrl} /> : <img src={`../../public/emptyprof.png`} />}
              </div>
            </div>
            <div className="ui grid column five wide">
            <div className="ui bio">
              {this.props.creator.bio}
              </div>
            </div>
            <div className="ui grid column">
              <h4 className="ui header" id="textbox">
                Notes on this Creator
              </h4>
              <MovieNotesDisplay selectedMovie={this.props.selectedMovie} pickMovieNote={this.props.pickMovieNote} creatorNoteContracts={this.props.creatorNoteContracts}/>
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

export default MyCreatorPage
