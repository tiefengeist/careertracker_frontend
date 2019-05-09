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
        :
    renderer =
         <div className="ui segment inverted">
           <form className="ui form" onSubmit={(ev) => {
               this.props.findYourUser(ev)
             }
           }>
           <h4 className="ui dividing header" color="white">Log In </h4>
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


    return (
      <div>
        {renderer}
      </div>
    )
  }
}

export default UserLogin
