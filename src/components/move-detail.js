import React, { Component } from "react";

class MoveDetail extends Component {
    constructor(props){
        super(props)

    }


    render(){
        return(
            <>
            <div className="move-detail">
                <p>Power:{this.props.power}</p>
                <p>Acc:{this.props.accuracy}</p>
                <p>PP:{this.props.pp}</p>
            </div>
            <p>{this.props.detail}</p>
            </>
        )
    }
}

export default MoveDetail;