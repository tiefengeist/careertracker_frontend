import React from 'react'
import Card from '../components/Card'


class CreatorDisplay extends React.Component {
  render() {
    return (
    <div className="ui segment">
      <div className="ui container">
        <div className="ui four column grid">
          {this.props.creators.map((creator, id) => {
            return <Card creator={creator} key={id} />
          })}
        </div>
      </div>
    </div>
    )
  }
}

export default CreatorDisplay
