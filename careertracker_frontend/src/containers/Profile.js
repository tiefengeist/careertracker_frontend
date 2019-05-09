import React from 'react';
import TrendingCreatorDisplay from './TrendingCreatorDisplay'

class Profile extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      popularCreators: []
    }
  }

  getTrendingData = () => {
  return fetch('https://api.themoviedb.org/3/trending/person/week?api_key=8c047ad16f4adffe431f0282012d22bc')
  .then(res => res.json())
  .then(json =>
    this.setState({
    popularCreators: json['results']
  })
)
  }

  componentDidMount() {
    this.getTrendingData();
  }


  render() {
    return (
      <div className="ui segment">
        <div id="trending-header" className="header"><h1>Trending Creators</h1></div> <TrendingCreatorDisplay

                                                toggleSelectedMovie={this.props.toggleSelectedMovie}
                                                token={this.props.token}
                                                pickMovie={this.props.pickMovie}
                                                selectedMovie={this.props.selectedMovie}
                                                addCreator={this.props.addCreator}
                                                creatorMovies={this.props.creatorMovies}
                                                selectedCreator={this.props.selectedCreator}
                                                pickCreator={this.props.pickCreator}
                                                clearSelect={this.props.clearSelect}
                                                creators={this.state.popularCreators}
                                                user={this.props.user} />
                                  </div>


    )
  }

}

// <div className="ui segment">
//   <h4>{this.props.username}</h4>
//
// </div>
//
// <div id="trending-header" className="header"><h1>Trending Creators</h1></div> <TrendingCreatorDisplay
//
//                                         toggleSelectedMovie={this.props.toggleSelectedMovie}
//                                         pickMovie={this.props.pickMovie}
//                                         selectedMovie={this.props.selectedMovie}
//                                         addCreator={this.props.addCreator}
//                                         creatorMovies={this.props.creatorMovies}
//                                         selectedCreator={this.props.selectedCreator}
//                                         pickCreator={this.props.pickCreator}
//                                         creators={this.state.popularCreators}/>
//                           </div>





export default Profile
