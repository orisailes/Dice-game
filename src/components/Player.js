import React from 'react'
import p1 from '../img/player1.png'
import p2 from '../img/player2.png'

class Player extends React.Component {
 state={
     images:[ <img className="player-img" src={p1}/>, <img className="player-img" src={p2}/>]
 }

    render() {
        return (
            <div className={`${this.props.scaleMe} ${this.props.className} player player${this.props.id}`}>
                <p className="player-heading" style={{fontSize:"1.2rem"}}>{this.props.name}</p> 
               <div>{this.state.images[this.props.id-1]}</div>
                <div className="current-score">
                    <p style={{fontSize:"1.1rem"}}>Total score</p>
                    <p>{this.props.playerTotalScore}</p>
                    <p style={{fontSize:"1.5rem"}}>Current score</p>
                    <p>{this.props.playerCurrentScore}</p>
                </div>
            </div>
        )
    }
}
export default Player;