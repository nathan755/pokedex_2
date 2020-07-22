import React, { Component } from "react";
import Axios from "axios";

 class PokemonCard extends Component {
     constructor(props){
         super(props)

        this.state={
            pokemonName:"",
            pokemonType:{},
            PokemonImg:""
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
        console.log("here")
        Axios.get(this.props.url).then((response)=>{
            console.log("respones in child", response.data)
            
            this.setState({
                pokemonName:response.data.name,
                pokemonType:response.data.types,
                PokemonImg:response.data.sprites.front_default
            })
        })
    }

    renderBackgroundDivs(){
        
        if(this.state.pokemonType.length === 2){
            
            return(
                <>
                    <div style={{backgroundColor: "#"+this.pokeColours[this.state.pokemonType[0].type.name]}} className="pokemon-card__left"></div>
                    <div style={{backgroundColor: "#"+this.pokeColours[this.state.pokemonType[1].type.name]}} className="pokemon-card__right"></div>
                </>
            )
        }
        else if (this.state.pokemonType.length === 1){
            // Check in place because on first render pokemonType doesnt exist yet
            return <div style={{backgroundColor: "#"+this.pokeColours[this.state.pokemonType[0].type.name]}}    className="pokemon-card__background"></div>
        }
        return null;
    }
    
    render(){
         return(
             <div className="pokemon-card">
                <this.renderBackgroundDivs />
                  <img src={this.state.PokemonImg}/>
                <p>{this.state.pokemonName}</p>
             </div>
         )
     }
 }

 export default PokemonCard;