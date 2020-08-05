import React, { Component } from "react";
import Axios from "axios";
import Move from "./move";

class Moves extends Component {
    constructor(props){
        super(props)

        this.state = {
            moves:[]
        }


    }

    componentDidUpdate(prevProps){
        if(prevProps.name !== this.props.name){
            Axios.get(`https://pokeapi.co/api/v2/pokemon/${this.props.name}`).then((res)=>{
                
                this.setState({
                    moves:res.data.moves
                })
            })
        }
    }



    render(){
        console.log("this.state", this.state)
        return(
            <div className="moves">
                {
                    this.state.moves.map((move) =>{return <Move pokeColours={this.props.pokeColours} url={move.move.url} /> })
                }
            </div>
        )
    }
}

export default Moves;