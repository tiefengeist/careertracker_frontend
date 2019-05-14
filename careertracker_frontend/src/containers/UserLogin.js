import React from 'react'

class UserLogin extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      toggler: true
    }
  }

  toggle = () => {
    this.setState({toggler: false})
  }

  untoggle = () => {
    this.setState({toggler: true})
  }

  render() {

    let renderer;

    this.state.toggler ?
    renderer =
      <div classname="ui segment white inverted">
        <div className="ui segment">
          <div className="ui two row grid">
            <div className="ui centered row">
              <img src='https://i.imgur.com/5ge5zlr.png'/>
            </div>
            <div className="ui centered row">
              <h2 className="ui centered header">About</h2>
              <div className="content" id="summarytext">
CareerNote is a web app made for film buffs to take detailed notes on creators’ individual contributions to movies. Using data from tMDB (the Movie Database), you can explore the filmographies of movie industry figures from the start of their careers up to the present. <br></br>

If you have thoughts on any of these creators, you can add them to a list, where you can engage with their careers further. If you navigate to the ‘My Creators’ page, and just click on any of the movies you see there, you can take notes on their contribution to any film they’ve been in.<br></br>

If you’d like to see the code, the GitHub repositories are public. Here is the <a href='https://github.com/tiefengeist/careertracker_backend'>backend</a> and the <a href='https://github.com/tiefengeist/careertracker_frontend'>frontend</a>.<br></br>

Here’s a <a href='https://medium.com/@sahirnambiar'>link</a> to my blog if you’d like to learn about some math.<br></br>

Enjoy!
</div>
            </div>
          </div>
          </div>
        <div className="ui segment">
          <form className="ui form" onSubmit={ev => this.props.logMeIn(ev)}>
          <h4 className="ui dividing header">Sign Up for an Account </h4>
            <div className="field">
              <input type="text" name="userName" placeholder="Enter Username"/>
            </div>
            <div className="field">
              <input type="password" name="password" placeholder="Enter Password"/>
            </div>
              <button className="ui centered button" type="submit">Submit</button>
              <a onClick={() => this.toggle()}>I already have an account...</a>
          </form>
        </div>
      </div>
        :
    renderer =
    <div classname="ui segment white inverted">
        <div className="ui segment">
          <div className="ui two row grid">
            <div className="ui centered row">
              <img src='https://i.imgur.com/5ge5zlr.png'/>
            </div>
            <div className="ui centered row">
              <h2 className="ui centered header">About</h2>
              <div className="content" id="summarytext">
    CareerNote is a web app made for film buffs to take detailed notes on creators’ individual contributions to movies. Using data from tMDB (the Movie Database), you can explore the filmographies of movie industry figures from the start of their careers up to the present. <br></br>

    If you have thoughts on any of these creators, you can add them to a list, where you can engage with their careers further. If you navigate to the ‘My Creators’ page, and just click on any of the movies you see there, you can take notes on their contribution to any film they’ve been in.<br></br>

    If you’d like to see the code, the GitHub repositories are public. Here is the <a href='https://github.com/tiefengeist/careertracker_backend'>backend</a> and the <a href='https://github.com/tiefengeist/careertracker_frontend'>frontend</a>.<br></br>

    Here’s a <a href='https://medium.com/@sahirnambiar'>link</a> to my blog if you’d like to learn about some math.<br></br>

    Enjoy!
    </div>
            </div>
          </div>
          </div>
         <div className="ui segment inverted">
           <form className="ui form" onSubmit={(ev) => {
               this.props.findYourUser(ev)
             }
           }>
           <h4 className="ui dividing header" id="logintext">Log In </h4>
             <div className="field">
               <input type="text" name="loginuserName" placeholder="Enter Username"/>
             </div>
             <div className="field">
               <input type="password" name="loginpassword" placeholder="Enter Password"/>
             </div>
               <button className="ui centered button" type="submit">Submit</button>
               <a onClick={() => this.untoggle()}>I need to sign up</a>
           </form>
         </div>
       </div>


    return (
      <div>
        {renderer}
      </div>
    )
  }
}

export default UserLogin
