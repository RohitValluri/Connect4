import React, { Component } from "react";
import {
  Route,
  NavLink
}from "react-router-dom";
import App from "./game";
 
class Player extends Component {
  render() {
    return (
      <div className="pa">
        <h2>Players</h2>
        <li>Player 1 : </li> 
        <p><input type="text" id="name" name="name" required placeholder="Enter Player 1 Name"></input><br></br></p>
          <li> Player 2 :  </li>
          <p><input type="text" id="name" name="name" required placeholder="Enter Player 2 Name"></input></p>   
          <NavLink to="/game"><button className="button">Start Game</button></NavLink>
          <div className="content">
            <Route path="/game" component={App}/>
          </div>
      
      </div>
    );
  }
}
 
export default Player;