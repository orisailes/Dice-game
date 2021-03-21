import React from 'react'

class newGame extends React.Component {

    render() {
        return (
            <button onClick={this.props.restartGame} className={`${this.props.className} new-game-btn btn`} > <i className="fas fa-redo"></i> New Game </button>
        )
    }
}

export default newGame