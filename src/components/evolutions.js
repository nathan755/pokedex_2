import React, { Component } from "react";
import Axios from "axios";

class Evolutions extends Component {
    constructor(props){
        super(props)
    
    
    }

    componentDidMount(){
        Axios.get("https://pokeapi.co/api/v2/evolution-chain/3").then((res)=>{
            console.log("res", res)
        })
    }


    render(){
        return(
            <div className="evolutions">

            </div>
        )
    }


}

export default Evolutions;