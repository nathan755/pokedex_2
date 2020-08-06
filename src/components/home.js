//React
import React, { Component } from "react";
// Components
import TopNav from "./top-navigation";
import SideNav from "./side-nav";
import SearchBar from "./search-bar";
import Axios from "axios";
import PokemonCard from "./pokemon-card";
class Home extends Component {
    constructor(props){
        super(props)

        this.state = {
            sideNavIsOpen:false,
            pokemonData:[],
            loading:true,
            searchTerm:""
        }

        this.sideNavToggler = this.sideNavToggler.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
        this.renderPokemonCards = this.renderPokemonCards.bind(this);

    }
    
    componentDidMount(){
        Axios.get("https://pokeapi.co/api/v2/pokemon?limit=155").then((res =>{
            
            this.setState({
                pokemonData:res.data.results,
                loading:false
            })
        }))
    }

    sideNavToggler(){
        // Handle opening and closing side navigation
        this.setState({sideNavIsOpen:!this.state.sideNavIsOpen});
    }

    onSearchChange(event){
        this.setState({
            searchTerm:event.target.value
        })
    }


    renderPokemonCards(){
        const searchValue = new RegExp(this.state.searchTerm)
        const filteredArray = this.state.pokemonData.filter((pokemon)=>  searchValue.test(pokemon.name))
        
        return(
            <div className="pokemon-card-container">
                {
                    filteredArray.map( pokemon =>  <PokemonCard url={pokemon.url} /> )
                }
            </div>
        )
    }
    
    render(){
        return(
            <div className={`home ${this.state.sideNavIsOpen && "open"}`}>
                <TopNav sideNavIsOpen={this.state.sideNavIsOpen} onClick={this.sideNavToggler} />
                <SideNav sideNavIsOpen={this.state.sideNavIsOpen} />
                <h1>Pokedex.org Clone</h1>
                <SearchBar onChange={this.onSearchChange} />
                {this.state.loading===false && <this.renderPokemonCards />}
            </div>
        )
    }
}

export default Home;