import React, { Component } from "react";

class Stats extends Component {
    constructor(props){
        super(props)

        this.renderStatBars = this.renderStatBars.bind(this);

    }

    renderStatBars(){
        
        return (
            this.props.stats.map((stat)=> {
                return(
                    <div className="stats__bars__bar">
                        <p>{stat.stat.name}</p>
                        
                            <p>{stat.base_stat}</p>
                       
                        
                    </div>
                )
            })
        )
    }


    render(){
        return(
            <div className="stats">

                <div className="stats__image">
                    <img src={this.props.image}/>
                </div>

                <div className="stats__bars">
                    <div className="stats__bars__types">
                        {this.props.types.map((type, index) => { return <span style={{backgroundColor:"#"+this.props.colours[this.props.types[index].type.name]}}>{type.type.name}</span>})}
                        <h3>{`#${this.props.order}`}</h3>
                    </div>
                    
                        <this.renderStatBars/>
                    
                   
                </div>
            </div>
        )
    }
}

export default Stats;