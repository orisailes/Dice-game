import React from 'react'
import dice1 from '../img/dice-1.png'
import dice2 from '../img/dice-2.png'
import dice3 from '../img/dice-3.png'
import dice4 from '../img/dice-4.png'
import dice5 from '../img/dice-5.png'
import dice6 from '../img/dice-6.png'

class diceGame extends React.Component {
    state = {
        myDice: [
            {
                imgDiv: <img className="dice-1" value="1" src={dice1} alt="dice1" />,
                value: 1,
            },
            {
                imgDiv: <img className="dice-2" value="2" src={dice2} alt="dice2" />,
                value: 2,
            },
            {
                imgDiv: <img className="dice-3" value="3" src={dice3} alt="dice3" />,
                value: 3,
            },
            {
                imgDiv: <img className="dice-4" value="4" src={dice4} alt="dice4" />,
                value: 4,
            },
            {
                imgDiv: <img className="dice-5" value="5" src={dice5} alt="dice5" />,
                value: 5,
            },
            {
                imgDiv: <img className="dice-6" value="6" src={dice6} alt="dice6" />,
                value: 6,
            },
        ],
        isFirstRolled: false,
        result: [null, null],
    }

    // hold the score for the player and move the turn
    holdIt = () => {
        // check if user did first roll the dice, then send it to the game and initiallized values.
        if (this.state.isFirstRolled === true) {
            this.props.diceResultToKeep(this.state.result)
            this.setState({ isFirstRolled: false, result: [null, null] })
        } else {
            console.log(`You need to roll the dice first.`)
        }
    }

    // roll the dice and sum the current score
    roleIt = async (e) => {
        
        // randomize 1-6
        const rollResultA = Math.floor(Math.random() * 6)
        const rollResultB = Math.floor(Math.random() * 6)

        // getting value & render the dice images from the state
        this.setState({
            result: [this.state.myDice[rollResultA].value, this.state.myDice[rollResultB].value],
            isFirstRolled: true
        }, () => {
            // sending to the parent the result to add it
            this.props.diceResult(this.state.result)
        })
    }
    
    // className={`${this.props.scaleMe} player player${this.props.id}`
    render() {
        return (
            <div className={`${this.props.className} game-managment`}>
                <button className="btn game-btn roll-btn" onClick={this.roleIt}> <i className="fas fa-dice"></i> Roll</button>
                <button className="btn game-btn hold-btn" onClick={this.holdIt}> <i className="fas fa-pause"></i> Hold</button>
                {this.state.isFirstRolled &&
                    <div className="dices">
                        <div className="roll" >{this.state.myDice[this.state.result[0] - 1].imgDiv}</div>
                        <div className="roll">{this.state.myDice[this.state.result[1] - 1].imgDiv}</div>
                    </div>
                }
            </div>
        )
    }
}
export default diceGame