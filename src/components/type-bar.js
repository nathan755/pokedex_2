import React, { Component } from "react";

class TypeBar extends Component {
    constructor(props){
        super(props)
        
        this.state = {}
    }


    render(){
        console.log("this", this.props.type)
        return(
            <div className="type-bar">
                <div style={{backgroundColor:this.props.colour}} className="type-bar__type">
                    <span>{this.props.type}</span>
                </div>
                <div className="type-bar__multiplier">
                    {this.props.showChevron ? <div onClick={this.props.onClick} className="chevron-holder "><i class="fas fa-chevron-right"></i></div> : <span>{this.props.multiplier}</span> }
                </div>
            </div>
            )
        }
    }

export default TypeBar;