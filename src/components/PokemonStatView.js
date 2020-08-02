import React, { Component } from "react";
import Axios from "axios";
import Stats from "./stats";
import {LightenDarkenColor} from "../utils/helpers";
import HeaderBar from "./header-bar";
import Profile from "./profile";
import DamageWhenAttacked from "./damage-when-attacked";
import Evolutions from "./evolutions";

/**Overall pokemon stats component. Component gets data and passes it down to smaller components */
class PokemonStatView extends Component{
    constructor(props){
        super(props)

         

        this.state = {
            abilities:[],
            height:"",
            image:"",
            moves:[],
            name:"",
            order:"",
            stats:[],
            weight:"",
            types:[]
        }

        this.pokeColours = {
            bug: "A8B820",
            dark: "705848",
            dragon: "7038F8",
            electric: "F8D030",
            fairy: "EE99AC",
            fighting: "C03028",
            fire: "F08030",
            flying: "A890F0",
            ghost: "705898",
            grass: "78C850",
            ground: "E0C068",
            ice: "98D8D8",
            normal: "A8A878",
            poison: "A040A0",
            psychic: "F85888",
            rock: "B8A038",
            steel: "B8B8D0",
            water: "6890F0"
          };

        this.renderBackgroundDivs = this.renderBackgroundDivs.bind(this);

    }

    componentDidMount(){
        // get pokemon's name from the query params and make request with that.
        const pokemonName = this.props.location.search.split("=")[1];
        

        Axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`).then((response)=>{
            this.setState({
                name:response.data.name,
                stats:response.data.stats,
                order:response.data.order,
                moves:response.data.moves,
                weight:response.data.weight,
                height:response.data.height,
                image:response.data.sprites.front_default,
                abilities:response.data.abilities,
                types:response.data.types,
                darkPrimaryColour:LightenDarkenColor(this.pokeColours[response.data.types[0].type.name],-70)
            })
        })
    }

    
    
    renderBackgroundDivs(){
        
        if(this.state.types.length === 2){
            
            return(
                <>
                    <div style={{backgroundColor: "#"+this.pokeColours[this.state.types[0].type.name]}} className="pokemon-stat-view__left"></div>
                    <div style={{backgroundColor: "#"+this.pokeColours[this.state.types[1].type.name]}} className="pokemon-stat-view__right"></div>
                </>
            )
        }
        else if (this.state.types.length === 1){
            // Check in place because on first render types doesnt exist yet
            return <div style={{backgroundColor:"#"+this.pokeColours[this.state.types[0].type.name]}} className="pokemon-stat-view__background"></div>
        }
        return null;
    }
    
    render(){
        return(
            <div className="pokemon-stat-view">
                <div className="pokemon-stat-view__back">
                     <i class="fas fa-arrow-left"></i>
                </div>
             
                <div  className="pokemon-stat-view__stats">
                    <div style={{backgroundColor:"#"+this.state.darkPrimaryColour}} className="pokemon-stat-view__stats__header">
                         <h1 >{this.state.name}</h1>
                         
                    </div>
                    <Stats name={this.state.name} image={this.state.image} types={this.state.types} colours={this.pokeColours} order={this.state.order} stats={this.state.stats} />
                    <HeaderBar header="Profile" colour={"#"+this.state.darkPrimaryColour} />
                    <Profile name={this.state.name} height={this.state.height} weight={this.state.weight} abilities={this.state.abilities} stats={this.state.stats}  />
                    <HeaderBar header="Damage When Attacked" colour={"#"+this.state.darkPrimaryColour} />
                    <DamageWhenAttacked types={this.state.types} colours={this.pokeColours} />
                    <HeaderBar header="Evolutions" colour={"#"+this.state.darkPrimaryColour} />
                    <Evolutions />
                </div>
                <this.renderBackgroundDivs />
              

            
            </div>
        )
    }
}

export default PokemonStatView;