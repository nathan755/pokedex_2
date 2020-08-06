import React from "react";

export default function HeaderBar(props){
    return (
        <div style={{backgroundColor:props.colour}} className="header-bar">
            <h2>{props.header}</h2>
        </div>
        )
    }