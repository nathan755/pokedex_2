// React crap
import React, { Component } from "react";
//Components
import TopNav from "./top-navigation";

class Home extends Component {
    constructor(props){
        super(props)

    }
    

    render(){
        return(
            <div>
                <TopNav />
            </div>
        )
    }
}

export default Home;