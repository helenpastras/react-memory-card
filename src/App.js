import React, { Component } from 'react';
// import logo from './logo.svg';
import Card from "./components/card";
import Nav from "./components/nav";
import Wrapper from "./components/wrapper";
import Title from "./components/title";
import Container from "./container";
import Row from "./row";
import Column from "./col";
import imageCards from "./imageCards.json";
import './App.css';

function shuffleImages(array){
  for (let i=array.length -1; i > 0; i--){
    let n = Math.floor(Math.random() * (i + 1));
    [array[i], array[n]] = [array[n], array[i]]; 
  }
  return array;
};

class App extends Component {
  // Set state
  state = {
    imageCards,
    currentScore:0,
    topScore:0,
    rightWrong: "",
    clicked: [],
  };

  handleClick = id => {
    if(this.state.clicked.indexOf(id) === -1){
      this.handleIncrement();
      this.setState({clicked: this.state.clicked.concat(id)});
    } else {
      this.handleReset();
    }
  };

  handleIncrement = () => {
    const newScore = this.state.currentScore +1;
    this.setState({
      currentScore :newScore,
      rightWrong: ""
    });
    if (newScore >= this.state.topScore){
      this.setState({topScore: newScore});
    }
    this.handleShuffle();
  };

  handleReset = () => {
    this.setState({
      currentScore: 0,
      topScore: this.state.topScore,
      rightWrong: "Stupify!",
      clicked: []
    });
    this.handleShuffle();
  };

  handleShuffle = () => {
    let shuffledImages =shuffleImages(imageCards);
    this.setState({imageCards:shuffledImages});
  };

  render() {
    return (
      <Wrapper>
        <Nav
          title=" Clicky Game - HP Version"
          score={this.state.currentScore}
          topScore={this.state.topScore}
          rightWrong={this.state.rightWrong}
        />
        <Title>
          Try to click on each image but avoid clicking duplicates or you will be Stupified!
        </Title>

        <Container>
          <Row>
            {this.state.imageCards.map(image =>(
              <Column size="md-3 sm-6">
              <Card
              key={image.id}
              handleClick={this.handleClick}
              handleIncrement={this.handleIncrement}
              handleReset={this.handleReset}
              handleShuffle={this.handleShuffle}
              id={image.id}
              image={image.image}
              />
              </Column>
            ))}
          </Row>
        </Container>
        </Wrapper>
    );
  }
}

export default App;
