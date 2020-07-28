import React, { Component } from "react";

class Stats extends Component {
    constructor(props){
        super(props)

        this.renderStatBars = this.renderStatBars.bind(this);

    }

    renderStatBars(){
        
        return (
            this.props.stats.map((stat)=> {
                
                // Set the colour to be index one
                const colour = "#"+this.props.colours[this.props.types[0].type.name]
                const width = stat.base_stat + 25
                console.log("width", width+50)
                


                return(
                    <div className="stats__bars__bar">
                        <p className="name">{stat.stat.name}</p>
                        
                        <div className="stat-wrapper">
                            <p style={{backgroundColor:colour , width:width}} className="stat">{stat.base_stat}</p>
                        </div>
                        
                        
                       
                        
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