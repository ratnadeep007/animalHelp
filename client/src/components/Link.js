import React, { Component } from 'react';

class Link extends Component {
  render() {
    return (
      <div>
        <div>
          {this.props.allAnimals.name} - {this.props.allAnimals.type}
        </div>
      </div>
    )
  }
}

export default Link;