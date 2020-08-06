import React, { Component } from 'react';
import { BrowserRouter as Router, Switch,Route,} from "react-router-dom";
import "./sass/core.scss";
import Home from "./components/home";
import PokemonStatView from "./components/PokemonStatView";


class App extends Component {
	constructor(props){
		super()

	}

	render(){
		return(
			<Router>
				<Switch>
					<Route path="/home" component={Home} />
					<Route path="/pokemon/:name/" component={PokemonStatView} />
				</Switch>
			</Router>
		)
	}
}

export default App;

