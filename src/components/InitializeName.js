import React from 'react'

class inputFirstName extends React.Component {

    state={
        value1:``,
        value2:``,
        isTrolling:false
    }

    onChange=(e)=>{
        this.setState({[e.target.id]:e.target.value})
    }

    sendNames=()=>{
        if(this.state.value1 !== `` && this.state.value2 !== ``){
            this.props.getFirstName(this.state)
        }else{
            this.setState({isTrolling:true})
        }
    }

    render() {
        return (
            <div className="names-input-container">
                <input id="value1" onChange={this.onChange} value={this.state.value1} className="new-game-input new-game-input-1" type="text" />
                <input id="value2" onChange={this.onChange} value={this.state.value2} className="new-game-input new-game-input-1" type="text" />
                <button className="btn" onClick={this.sendNames}> <i class="fas fa-play-circle"></i> START GAME!</button>
                <div className={this.state.isTrolling?'fix-names':'hidden'}><h4>Please insert valid names.</h4></div>
            </div>
        )
    }
}

export default inputFirstName;