import React from 'react'
import DiceGame from './Dice-Game'
import LimitScoreInput from './LimitScoreInput'
import Player from './Player'

//!mission:
//handle win!
//handle input bug
//check for bugs
//add sound?
//think on more


class Game extends React.Component {
  state = {
    players: [
      {
        isHisTurn: true,
        currentScore: 0,
        totalScore: 0,
      },
      {
        isHisTurn: false,
        currentScore: 0,
        totalScore: 0
      },
    ],
    winningScore: 50,
  }

  async componentDidUpdate() {
    await this.render()
  }

  // switch player turn
  switchPlayer = () => {
    let temp = [...this.state.players];
    temp[0].currentScore = 0
    temp[1].currentScore = 0
    if (temp[0].isHisTurn) {
      temp[0].isHisTurn = false;
      temp[1].isHisTurn = true;
      this.setState({ players: temp })
    } else {
      temp[1].isHisTurn = false;
      temp[0].isHisTurn = true;
      this.setState({ players: temp })
    }
  }

  // return an object of the current player
  whoTurnIs = () => {
    return this.state.players[0].isHisTurn ? this.state.players[0] : this.state.players[1]
  }

  // add to player's current score
  diceResult = (info) => {
    let numToAdd = info[0] + info[1];
    if (numToAdd === 12) {
      console.log(`BAAAAAA`)
      this.switchPlayer()
    }
    else {
      let temp = [...this.state.players];
      if (temp[0].isHisTurn) {
        temp[0].currentScore += numToAdd;
      } else {
        temp[1].currentScore += numToAdd;
      }
      if (this.whoTurnIs().currentScore + this.whoTurnIs().totalScore >= this.state.winningScore) {
        alert(`we got a winner`)
      }
     
      this.setState({ players: temp })

    }
  }

  // add to playes's total score
  diceResultToKeep = (info) => {
    // let numToAdd = info[0] + info[1]  <<<   do i need that?????????????????????
    let temp = [...this.state.players];
    if (temp[0].currentScore > 0) {
      temp[0].totalScore += temp[0].currentScore
    } else {
      temp[1].totalScore += temp[1].currentScore
    }
    this.setState({ players: temp })
    this.switchPlayer()
  }

  // get max score that user input and set it to state
  getMaxScore = (num) => {
    this.setState({ winningScore: num }, () => {
      if (this.state.players[0].currentScore + this.state.players[0].totalScore > num ||
        this.state.players[1].currentScore + this.state.players[1].totalScore > num
      ) {
        alert('we got a winner')
      }
    })
  }


  render() {
    return (
      <div className="game-container">
        <Player scaleMe={this.state.players[0].isHisTurn && "show-me"} id="1" playerCurrentScore={this.state.players[0].currentScore} playerTotalScore={this.state.players[0].totalScore} />
        <Player scaleMe={this.state.players[1].isHisTurn && "show-me"} id="2" playerCurrentScore={this.state.players[1].currentScore} playerTotalScore={this.state.players[1].totalScore} />
        <DiceGame diceResultToKeep={this.diceResultToKeep} diceResult={this.diceResult} />
        <LimitScoreInput getMaxScore={this.getMaxScore} />
      </div>
    )
  }
}

export default Game;