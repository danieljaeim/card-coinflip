import React, { Component } from 'react';

class Card extends Component {

  render() {

    let { image, rotation } = this.props.card;
    let isHidden = this.props.isHidden;

    let cardStyle = {
      position: 'absolute',
      zIndex: this.props.id,
      transform: `rotate(${rotation}deg)`,
      display: (isHidden ? 'none' : '')
    }

    return(
      <div style={cardStyle}>
        <img src={image} alt=''/>
      </div>
    );
  }
}

export default Card; 