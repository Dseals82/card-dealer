import React, { Component } from 'react';
import axios from "axios";
import Card from './Card';
import "./Deck.css"
const API_BASE_URL = "https://deckofcardsapi.com/api/deck";

class Deck extends Component {
  constructor(props){
    super(props);
    this.state= {deck: null, drawn: []}
    this.getCard = this.getCard.bind(this);
  }

async  getCard(){
    let deck_id = this.state.deck.deck_id;
    try {
      let cardUrl= `${API_BASE_URL}/${deck_id}/draw/`;
      let cardRes = await axios.get(cardUrl);
      if(!cardRes.data.success){
        throw new Error("Oops! No cards remaining!")
      }
      let card = cardRes.data.cards[0];
      this.setState(st=>({
        drawn: [
          ...st.drawn,
          {
            id: card.code,
            image: card.image,
            name: `${card.value} of ${card.suit}`
          }
        ]
      }));
    }catch(err){
      alert(err);
    }
  }

  async componentDidMount(){
    let deck = await axios.get(`${API_BASE_URL}/new/shuffle/`)
    this.setState({deck: deck.data})
  }

  render(){
    const cards = this.state.drawn.map(c => (
      <Card key={c.id} name={c.name} image={c.image} />
    ));
    return (
      <div className="Deck">
      <h1 className="Deck-title"><span className="Deck-diamond">&#9670;</span> Card Dealer <span className="Deck-diamond">&#9670;</span></h1>
      <h3 className="Deck-title subtitle">&#9671; A little Demo built using React! &#9671;</h3>
      <button className="Deck-btn" onClick={this.getCard}>Get Card!</button>
      <div className="Deck-card-area">{cards}</div>
      </div>
    );
  }

}

export default Deck;
