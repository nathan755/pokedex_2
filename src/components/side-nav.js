import React, { Component } from "react";

class SideNav extends Component {
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div className={`side-nav ${this.props.sideNavIsOpen && "open"}`}>
                <div className="side-nav__header">
                    <h2>Pokedex Clone</h2>
                </div>
                <ul>
                    <li>
                        Pokémon
                    </li>
                    <li>
                        About
                    </li>
                </ul>
            </div>
        )
    }
}

export default SideNav;