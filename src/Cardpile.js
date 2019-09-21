import React, { Component } from 'react';
import axios from 'axios';
import Card from './Card';
import ButtonManagement from './ButtonManagement';
import './cardPile.css'

class Cardpile extends Component {

  static defaultProps = {
    numDeck: 3
  }

  constructor(props) {
    super(props)
    this.state = {
      cards: [],
      nextId: 0,
      isGreater: true,
      winLossRecord: [0, 0]
    }
    this.handleClick = this.handleClick.bind(this);
    this.compareCards = this.compareCards.bind(this);
  }

  handleClick() {
    this.setState(st => ({ nextId: st.nextId + 1 }))
  }

  async componentDidMount() {
    let deck = await axios.get(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=${this.props.numDeck}`)
    let deckId = deck.data.deck_id;
    let drawDeck = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${this.props.numDeck * 52}`)
    let deckWithRotations = drawDeck.data.cards.map(card => ({...card, rotation: Math.floor(Math.random() * 180)}))
    this.setState({ cards: deckWithRotations });
  }

  compareCards(guess) {

    /* start with our nextId, from this.state. Uses nextId to identify the previous card and the current card
    *  Assign a numeric value to both cards in order to compare card strengths
    *  After comparison, we know which card is greater, and we compare that boolean with user's guess
    *  Update the winLossRecord and notify the user about the accuracy of the guess 
    */
    function cardIsGreater() {
      
      let previousCard = this.state.cards[this.state.nextId - 1]
      let currentCard = this.state.cards[this.state.nextId]

      let cardOrder = ['2', '3', '4', '5', '6', '7', '8', '9', '1', 'J', 'Q', 'K', 'A']
      let suitOrder = ['D', 'C', 'H', 'S']
      let prevValue = cardOrder.indexOf(previousCard.value[0]) * 10 + suitOrder.indexOf(previousCard.suit[0])
      let curValue = cardOrder.indexOf(currentCard.value[0]) * 10 + suitOrder.indexOf(currentCard.suit[0]) 

      let isHigher = curValue > prevValue
      let isCorrect = isHigher === guess
      let winIncrement = isCorrect
      let lossIncrement = (isCorrect + 1) % 2

      this.setState(st => ( 
        { nextId: st.nextId + 1,
         isGreater: isCorrect, 
         winLossRecord: [ st.winLossRecord[0] + winIncrement ,
                          st.winLossRecord[1] + lossIncrement]
        }));

    }
    if (this.state.nextId > 0 && this.state.nextId < this.props.numDeck * 52) {
      cardIsGreater.bind(this)()
    } else {
      this.handleClick()
    }
  }

  render() {

  let prediction = this.state.isGreater;
  let [wins, losses] = this.state.winLossRecord

  return (

    <div>
      <div>Wins: { wins } Losses: { losses } </div>
      <div className='cardPile'>
        {this.state.cards.map((card, i) => <Card key={i} 
                                                 id={i}
                                                 card={ card }
                                                 isHidden={ i >= this.state.nextId } />)}
      </div>
      <ButtonManagement handleClick={ this.handleClick } compareCards={ this.compareCards } prediction={ prediction } />
    </div>
  );
}
    
    }

export default Cardpile;