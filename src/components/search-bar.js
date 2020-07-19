import React, { Component } from "react";
import SearchIcon from "./search-icon";

class SearchBar extends Component {
    constructor(props){
        super(props)

        this.state = {
            value:"",
            focus:false
        }

        this.onInputChange = this.onInputChange.bind(this);
        this.onInputClick = this.onInputClick.bind(this);
        this.onOutsideClick = this.onOutsideClick.bind(this);
        this.setWrapperRef = this.setWrapperRef.bind(this);

    }

    componentDidMount(){
        document.addEventListener('mousedown', this.onOutsideClick);
    }

    componentWillUnmount(){
        document.removeEventListener('mousedown', this.onOutsideClick);
    }
    
    onInputChange(event){
        // Call parent on change function and pass event up.
        this.setState({value:event.target.value});
        this.props.onChange(event);
    }

    onInputClick(){
        document.getElementById("search").focus();
        this.setState({focus:true});
    }

    onOutsideClick(event){
        // Handle checking for clicks outside of component.
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.setState({focus:false});
        }
    }

    setWrapperRef(node) {
        this.wrapperRef = node;
    }
    
    render(){
        return(
            <div onClick={this.onInputClick} ref={this.setWrapperRef} className={`search-bar ${this.state.focus && "focus"}`}>
                <input id="search" placeholder="Search For Pokémon" onChange={this.onInputChange} value={this.state.value} />
                <i class="fas fa-search"></i>
            </div>
        )
    }
}

export default SearchBar;


