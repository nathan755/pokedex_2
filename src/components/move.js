import React, { Component } from "react";
import TypeBar from "./type-bar";
import Axios from "axios";
import MoveDetail from "./move-detail";

class Move extends Component {
    constructor(props){
        super(props)

        this.state = {
            power:"",
            pp:"",
            accuracy:"",
            name:"",
            type:"",
            detail:"",
            loading:true,
            showDetails:false
        }

        this.onChevronClick = this.onChevronClick.bind(this);
    }
    
    componentDidMount(){
        
        Axios.get(this.props.url).then((response)=>{
            
            this.setState({
                accuracy:response.data.accuracy,
                power:response.data.power,
                pp:response.data.pp,
                name:response.data.name,
                type:response.data.type.name,
                detail:response.data.flavor_text_entries[1].flavor_text,
                loading:false
            })
        })
    }

    onChevronClick(){
        this.setState({showDetails:!this.state.showDetails})
    }




    render(){
        if(!this.state.loading){
            return(
                <div className={`move ${this.state.showDetails === true ? "open": "closed"}`}>
                    <p>{this.state.name }</p>
                    <TypeBar onClick={this.onChevronClick} showChevron={true} type={this.state.type} colour={"#"+this.props.pokeColours[this.state.type ]} />
                    {this.state.showDetails === true && <MoveDetail pp={this.state.pp} power={this.state.power} detail={this.state.detail} accuracy={this.state.accuracy} /> }
                </div>
            )
        }
        return null
        
    }
}

export default Move;