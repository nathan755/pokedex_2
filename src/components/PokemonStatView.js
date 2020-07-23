import React, { Component } from "react";
import Axios from "axios";

/**Overall pokemon stats component. Component gets data and passes it down to smaller components */
class PokemonStatView extends Component{
    constructor(props){
        super(props)

        // grab 

        this.state = {
            abilities:[],
            height:"",
            image:"",
            moves:[],
            name:"",
            order:"",
            stats:[],
            weight:""
        }

    }

    componentDidMount(){
        // get pokemon's name from the query params and make request with that.
        const pokemonName = this.props.location.search.split("=")[1];
        Axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`).then((response)=>{
            console.log("res", response)

            this.setState({
                name:response.data.name,
                stats:response.data.stats,
                order:response.data.order,
                moves:response.data.moves,
                weight:response.data.weight,
                height:response.data.height,
                image:response.data.sprites.back_default,
                abilities:response.data.abilities
            })
        })
    }
    
    render(){
        return(
            <div className="pokemon-stat-view">
                <h1>{this.state.name}</h1>
                <div className="pokemon-stat-view__stats"></div>
                <div className="pokemon-stat-view__left"></div>
                <div className="pokemon-stat-view__right"></div>
            </div>
        )
    }
}

export default PokemonStatView;