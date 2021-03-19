import React from 'react'
import DiceGame from './Dice-Game'
import LimitScoreInput from './LimitScoreInput'
import Player from './Player'
import NewGame from './NewGame'
import InitializeName from './InitializeName'
//!mission:
//check for bugs
//add sound?
//think on more


class Game extends React.Component {
  state = {
    isNameGiven: false,
    players: [
      {
        isHisTurn: true,
        currentScore: 0,
        totalScore: 0,
        id: 1,
      },
      {
        isHisTurn: false,
        currentScore: 0,
        totalScore: 0,
        id: 2
      },
    ],
    playersNames: [``, ``],
    winningScore: 50,
    theWinnerIs: null,

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

  //wait function
  wait = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  }

  // add to player's current score
   diceResult = async (info) => {
    let numToAdd = info[0] + info[1];
    if (numToAdd === 12) {
      {document.querySelectorAll(`.game-btn`).forEach((e)=>e.classList.add(`hidden`))}
      await this.wait(3000)
      {document.querySelectorAll(`.game-btn`).forEach((e)=>e.classList.remove(`hidden`))}
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
        this.setState({ theWinnerIs: this.whoTurnIs().id },
          () => { console.log(this.state) })
      }

      this.setState({ players: temp })

    }
  }

  // add to playes's total score
  diceResultToKeep = (info) => {
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
      // check if ther is a winner after initialized new score
      if (this.state.players[0].currentScore + this.state.players[0].totalScore > num ||
        this.state.players[1].currentScore + this.state.players[1].totalScore > num
      ) {
        // set the new winner if so
        this.setState({
          theWinnerIs:
            this.state.players[0].currentScore + this.state.players[0].totalScore >
              this.state.players[1].currentScore + this.state.players[1].totalScore ? 1 : 2
        },
          () => { console.log(this.state) })
      }
    })
  }

  // restart game
  restartGame = () => {
    this.setState(
      {
        players: [
          {
            isHisTurn: true,
            currentScore: 0,
            totalScore: 0,
            id: 1,
          },
          {
            isHisTurn: false,
            currentScore: 0,
            totalScore: 0,
            id: 2
          },
        ],
        winningScore: 50, theWinnerIs: null,
      }
    )
  }

  getFirstName = (info) => {
    this.setState({ isNameGiven: true, playersNames: [info.value1, info.value2] })
  }

  

  render() {
    // check if ther is names provided, else ask name from user
    if (!this.state.isNameGiven) {
      return (
        <div className="game-container">
          <InitializeName getFirstName={this.getFirstName} />
        </div>
      )
    }
    return (
      //!if there is a winner, new classNames is sent.
      <div>
        <div className="game-container">
          <Player className={this.state.theWinnerIs === 1 ? "winner" : ''} scaleMe={this.state.players[0].isHisTurn ? "show-me" : ''} id="1" name={this.state.playersNames[0]} playerCurrentScore={this.state.players[0].currentScore} playerTotalScore={this.state.players[0].totalScore} />
          <Player className={this.state.theWinnerIs === 2 ? "winner" : ''} scaleMe={this.state.players[1].isHisTurn ? "show-me" : ''} id="2" name={this.state.playersNames[1]} playerCurrentScore={this.state.players[1].currentScore} playerTotalScore={this.state.players[1].totalScore} />
          <NewGame restartGame={this.restartGame} />
          <DiceGame className={this.state.theWinnerIs !== null ? "hidden" : ``} diceResultToKeep={this.diceResultToKeep} diceResult={this.diceResult} />
          <LimitScoreInput className={this.state.theWinnerIs !== null ? "hidden" : ``} getMaxScore={this.getMaxScore} />
        </div>

      </div>
    )
  }
}

export default Game;