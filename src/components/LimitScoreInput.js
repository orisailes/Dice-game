import React from 'react'


class input extends React.Component {
    state = {
        maxPoints: 100,
    }

    handleChange = (e) => {
        // make validation and set the state

        if(!isNaN(e.target.value)&&!Number.isInteger(e.target.value)){
            this.setState({ maxPoints: Number(e.target.value) })
        }
    }

    sendNewMaxPoint = () => {
       this.props.getMaxScore(this.state.maxPoints)
    }

    render() {
        return (
            <div className={`max-score-input ${this.props.className}`}>
                <input placeholder="Set max point" onChange={this.handleChange} type="text"></input>
                <button className="btn" onClick={this.sendNewMaxPoint}>Set new maximum score</button>
            </div>
        )
    }
}

export default input