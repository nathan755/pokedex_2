//React
import React, { Component } from "react";
// Components
import TopNav from "./top-navigation";
import SideNav from "./side-nav";
import SearchBar from "./search-bar";

class Home extends Component {
    constructor(props){
        super(props)

        this.state = {
            sideNavIsOpen:false
        }

        this.sideNavToggler = this.sideNavToggler.bind(this);

    }

    sideNavToggler(){
        // Handle opening and closing side navigation
        this.setState({sideNavIsOpen:!this.state.sideNavIsOpen});
        
    }

    

    render(){
        return(
            <div>
                <TopNav sideNavIsOpen={this.state.sideNavIsOpen} onClick={this.sideNavToggler} />
                <SideNav sideNavIsOpen={this.state.sideNavIsOpen} />
                <SearchBar />
            </div>
        )
    }
}

export default Home;