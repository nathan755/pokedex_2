import React, { Component } from "react";
import Axios from "axios";

class Stats extends Component {
    constructor(props){
        super(props)

        this.state = {
            genus:"",
            pokemonAbout:""
        }

        this.renderStatBars = this.renderStatBars.bind(this);

    }
    
    componentDidUpdate(prevProps){
        if(this.props.name !== prevProps.name){
            Axios.get(`https://pokeapi.co/api/v2/pokemon-species/${this.props.name}`).then((res)=> {
                
                //Remove crap from string
            const about = res.data.flavor_text_entries[0].flavor_text.replace(/(\r\n|\n|\r|\f)/gm," ");
            this.setState({
                genus:res.data.genera[7].genus,
                pokemonAbout:about
            })

        })
        }
    }
    
    renderStatBars(){
        return (
            this.props.stats.map((stat)=> {
                
                // Set the colour to be index one
                const colour = "#"+this.props.colours[this.props.types[0].type.name]
                const width = stat.base_stat + 25
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
            <>
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
                <div className="stats__about">
                    <h4>{this.state.genus}</h4>
                    <p >{this.state.pokemonAbout}</p>
                </div>
                
            </>
        )
    }
}

export default Stats;