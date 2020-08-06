import React, { Component } from "react";

class MoveDetail extends Component {
    constructor(props){
        super(props)

    }


    render(){
        return(
            <div className="move-detail-wrapper">
                <div className="move-detail">
                    <p><strong>Power:</strong>{this.props.power}</p>
                    <p><strong>Acc:</strong>{this.props.accuracy}</p>
                    <p><strong>PP:</strong>{this.props.pp}</p>
                </div>
                <p>{this.props.detail}</p>
            </div>
        )
    }
}

export default MoveDetail;