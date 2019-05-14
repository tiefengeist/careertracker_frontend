import React from 'react';
import SpecialtyCard from '../components/SpecialtyCard'


class CreatorPage extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      myCreators: [],
      overlap: []
    }
  }

  findOverlap = () => {

    if (this.state.myCreators.length > 0) {
      let newArray = [...this.state.overlap];
      this.state.myCreators.forEach((myCreator) => {

        if (myCreator.specialty === "Acting" && this.props.creator.known_for_department === "Acting" && myCreator.id !== this.props.creator.id) {
                  fetch(`https://api.themoviedb.org/3/discover/movie?api_key=8c047ad16f4adffe431f0282012d22bc&language=en-US&with_cast=${this.props.creator.id},${myCreator.id}`)
                  .then(res => res.json())
                  .then(json => {
                    console.log(newArray)
                    let tempObj = {collaborator: myCreator, movies: json.results};

                    if (tempObj.movies.length > 0) {
                      newArray.push(tempObj);
                      this.setState({overlap: newArray})
                  } else {
                    return null
                  }
                })
        } else if (myCreator.specialty === "Acting" && this.props.creator.known_for_department !== "Acting" && myCreator.id !== this.props.creator.id) {
                    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=8c047ad16f4adffe431f0282012d22bc&language=en-US&with_cast=${myCreator.id}&with_crew=${this.props.creator.id}`)
                    .then(res => res.json())
                    .then(json => {
                      let tempObj = {collaborator: myCreator, movies: json.results};
                        if (tempObj.movies.length > 0) {
                          newArray.push(tempObj);
                          this.setState({overlap: newArray})
                      } else {
                        return null
                       }
                     })

         } else if (myCreator.specialty !== "Acting" && this.props.creator.known_for_department !== "Acting" && myCreator.id !== this.props.creator.id) {
                    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=8c047ad16f4adffe431f0282012d22bc&language=en-US&with_crew=${myCreator.id},${this.props.creator.id}`)
                    .then(res => res.json())
                    .then(json => {
                      let tempObj = {collaborator: myCreator, movies: json.results};
                        if (tempObj.movies.length > 0) {
                          newArray.push(tempObj);
                          this.setState({overlap: newArray})
                      } else {
                        return null
                       }
                     })

          } else if (myCreator.specialty !== "Acting" && this.props.creator.known_for_department === "Acting" && myCreator.id !== this.props.creator.id) {
                    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=8c047ad16f4adffe431f0282012d22bc&language=en-US&with_cast=${this.props.creator.id}&with_crew=${myCreator.id}`)
                    .then(res => res.json())
                    .then(json => {
                      let tempObj = {collaborator: myCreator, movies: json.results};
                        if (tempObj.movies.length > 0) {
                          newArray.push(tempObj);
                          this.setState({overlap: newArray})
                      } else {
                        return null
                       }
                     })
                   }
               })
         } else {
             return null
           }
      }

  getMyData = () => {
    fetchRequest(`http://localhost:3000/api/v1/creators/currentuser`, 'post', {user_id: this.props.user.id}, this.props.token)
    .then(res => res.json())
    .then(json => {
      this.setState({myCreators: json}, () => {this.findOverlap()})
    })

  }



  componentDidMount() {
    this.getMyData();


  }

  componentWillUnmount() {
    this.setState({overlap: []})
  }


  render() {
    let imageUrl =`https://image.tmdb.org/t/p/w500` + this.props.creator.profile_path;

    let renderer;


    renderer =

                <div className="ui segment">
                  <div className="ui black two row grid">
                  <div className="ui row">
                    <div className="ui three column grid ">
                      <div className="ui grid column">
                        <div className="creator-name">
                          <h4 className="creatorName">{this.props.creator.name}</h4>
                        </div>
                        <div className="ui image">
                        {this.props.creator.profile_path ? <img src={this.props.creator.profile_path ? imageUrl : 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'} alt="creator image"/> : <img src={`../../public/emptyprof.png`} alt="empty profile" />}
                        </div>
                      </div>
                      <div className="ui grid column nine wide">
                      <div className="ui bio">
                        {this.props.creator.biography}
                        </div>
                      </div>
                      <div className="ui grid column">
                        <div className="add-button">
                          Add This Creator
                        </div>
                        <div className="ui button icon" onClick={(ev) => this.props.addCreator(ev)}>
                          Add This Creator
                        </div>
                      </div>
                    </div>
                  </div>

                <div className="ui centered row">
                  <div className="ui raised gray segment">
                  <div className="ui center aligned header">
                    {this.state.overlap.length > 0 ? `Collaborations with Creators You Follow` : `No Collaborations with Your Creators`}
                  </div>
                  <div className="ui three column centered grid">
                    {this.state.overlap.map((obj, id) => {
                      return <SpecialtyCard movies={obj.movies} creator={obj.collaborator} pickCreator={this.props.pickCreator} pickMovie={this.props.pickMovie} key={obj.collaborator.id} />
                    })}
                  </div>
                  </div>
                </div>

              </div>
            </div>




    return (

      <div className="ui container">
        {renderer}
      </div>
    )
  }


}

export default CreatorPage;

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
