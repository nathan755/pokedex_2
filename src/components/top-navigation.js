import React, { Component } from "react";

class TopNavigation extends Component {
    constructor(props){
        super(props)
        
        this.onHamburgerClick = this.onHamburgerClick.bind(this);
    }

    onHamburgerClick(event){
        // Call parent click handler and pass the event.
        this.props.onClick(event)
    }
    
    render(){
        return(
            <div className={`top-nav`}>
                <div onClick={this.onHamburgerClick} className="top-nav__hamburger">
                     <i class="fas fa-bars"></i>
                </div>
            </div>
        )
    }
}

export default TopNavigation;