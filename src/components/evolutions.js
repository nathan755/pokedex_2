import React, { Component } from "react";
import Axios from "axios";

class Evolutions extends Component {
    constructor(props){
        super(props)

        this.state = {
           chain:[],
           loading:true 
        }
        
        this.renderEvolutionChain = this.renderEvolutionChain.bind(this);
    }

    componentDidUpdate(prevProps){
        
        if(prevProps !== this.props){
            
            const requests = [];
            
            // Get evolution chain
            Axios.get(`https://pokeapi.co/api/v2/pokemon-species/${this.props.name}`).then((res)=>{
                
                Axios.get(res.data.evolution_chain.url).then((res)=>{
                    
                    // Bang first base in requests (there will always be a base url) 
                    requests.push(Axios.get(`https://pokeapi.co/api/v2/pokemon/${res.data.chain.species.name}`));
                    
                    // Check if evolution 2 exists 
                    if(res.data.chain.evolves_to.length !== 0){
                        requests.push(Axios.get(`https://pokeapi.co/api/v2/pokemon/${res.data.chain.evolves_to[0].species.name}`));
                        
                        // Check if evolution 3 exists 
                         if( res.data.chain.evolves_to[0].evolves_to.length !== 0 ){
                            requests.push(Axios.get(`https://pokeapi.co/api/v2/pokemon/${res.data.chain.evolves_to[0].evolves_to[0].species.name}`));
                        }
                    }
                    
                    Promise.all(requests).then((response)=>{
                        this.setState({
                            loading:false,
                            evolutionChain:response
                        });
                    });
                })
            })
        }
    }

    renderEvolutionChain(){
        if(!this.state.loading){
            return(
                <>
                    {this.state.evolutionChain.map((pokemon)=>{
                        return(
                            <>
                            <div className="evolutions__link">
                                <img src={pokemon.data.sprites.front_default}/>
                                <h4>{pokemon.data.name}</h4>
                                
                            </div>
                            
                            </>
                        )
                    })}
                </>
            )
        }
        return null
    }
    
    render(){
        
        return(
            <div className="evolutions">
                <this.renderEvolutionChain />
            </div>
        )
    }
}

export default Evolutions;