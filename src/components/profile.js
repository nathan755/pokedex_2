import React, { Component, Suspense } from "react";
import Axios from "axios";
class Profile extends Component {
    constructor(props){
        super(props)

           this.state = {
                height:"",
                catchRate:"",
                eggGroups:[],
                abilities:"",
                weight:"",
                genderRatio:"",
                hatchSteps:"",
                stats:"",
            }
        }
        
    componentDidUpdate(prevProps){
        if(prevProps.name !== this.props.name){
            Axios.get(`https://pokeapi.co/api/v2/pokemon-species/${this.props.name}/`).then((response)=>{
                
                this.setState({
                    genderRatio:response.data.gender_rate, // The chance of this Pokémon being female, in eighths; or -1 for genderless.
                    hatchSteps:response.data.hatch_counter, // Initial hatch counter: one must walk 255 × (hatch_counter + 1) steps before this Pokémon's egg hatches, unless utilizing bonuses like Flame Body's.
                    catchRate:response.data.capture_rate, // The base capture rate; up to 255. The higher the number, the easier the catch.
                    eggGroups:response.data.egg_groups,  // A list of egg groups this Pokémon species is a member of.
                    // Rest of stats get from props.
                })
            })
        }
    }
    
    render(){
        
        return(
            <div className="profile">
                <div className="profile__container">
                    <div className="flex-container">
                        <h4>Height:</h4>
                        <span>{this.props.height}</span> 
                    </div>
                    <div className="flex-container">
                        <h4>Catch Rate:</h4>
                        <span>{this.state.catchRate}</span> 
                    </div>
                    <div className="flex-container">
                        <h4>Egg Groups:</h4>
                        {this.state.eggGroups.map(item =>  <span>{item.name}</span>)} 
                    </div>
                    <div className="flex-container">
                        <h4>Abilities:</h4>
                        {this.props.abilities.map(ability => <span>{ability.ability.name}</span>)}
                    </div>
                </div>
                <div className="profile__container">
                    <div className="flex-container">
                        <h4>Weight:</h4>
                        <span>{this.props.weight}</span> 
                    </div>
                    <div className="flex-container">
                        <h4>Gender Ratio:</h4>
                        <span>{this.state.genderRatio}</span> 
                    </div>
                    <div className="flex-container">
                        <h4>Hatch Steps:</h4>
                        <span>{this.state.hatchSteps}</span> 
                    </div>
                    <div className="flex-container">
                        <h4>EVs:</h4>
                        <span>fix later</span> 
                    </div>
                </div>
            </div>
        )
    }
}

export default Profile;