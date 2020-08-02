import React, { Component } from "react";

class TypeBar extends Component {
    constructor(props){
        super(props)
        
        this.state = {}
    }


    render(){
        return(
            <div className="type-bar">
                <div style={{backgroundColor:this.props.colour}} className="type-bar__type">
                    <span>{this.props.type}</span>
                </div>
                <div className="type-bar__multiplier">
                    {this.props.showChevron ? <div></div> : <span>{this.props.multiplier}</span> }
                </div>
            </div>
            )
        }
    }

export default TypeBar;