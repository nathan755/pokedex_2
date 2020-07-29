import React, { Component } from "react";
import TypeBar from "./type-bar";

class DamageWhenAttacked extends Component {
    constructor(props){
        super(props)



    }

    render(){
        return(
            <div className="damage-when-attacked">
                <TypeBar type="test" colour="red" showChevron={false} multiplier="X3" />
            </div>
        )
    }


}

export default DamageWhenAttacked;