import React, { Component } from 'react';
import './ButtonManagement.css';

class ButtonManagement extends Component {

  constructor(props) {
    super(props);
    this.isHigher = this.isHigher.bind(this)
    this.isLower = this.isLower.bind(this)
  }

  isHigher() {
    this.props.compareCards(true);
  }

  isLower() {
    this.props.compareCards(false);
  }

  render() {
    const predictionMsg = this.props.prediction ? "Correct" : "That's Wrong!"

    return (
      <div>
        <h1 className="prediction-message">{predictionMsg}</h1>

        <div className="next-card button">
          <button onClick={this.props.handleClick}>Next Card</button>
        </div>
        <span className="higher button">
          <button onClick={this.isHigher}>Higher</button>
        </span>
        <span className="lower button">
          <button onClick={this.isLower}>Lower</button>
        </span>
      </div>
    )
  }
}

export default ButtonManagement;