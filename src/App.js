import React, { Component } from 'react';
import { BrowserRouter as Router, Switch,Route,} from "react-router-dom";
import "./sass/core.scss";
import Home from "./components/home";

class App extends Component {
	constructor(props){
		super()

	}

	render(){
		return(
			<Router>
				<Switch>
					<Route path="/home" component={Home} />
				</Switch>
			</Router>
		)
	}
}

export default App;

