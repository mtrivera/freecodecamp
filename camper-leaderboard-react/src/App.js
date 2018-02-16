import React, { Component } from 'react';
import './App.css';

const Header = () => (
  <header>
    <h1>freeCodeCamp Camper Leaderboard</h1>
    <p>View the top 100 brownie point earners of all time or the last 30 days.<br />Brownie points
    are given to campers for helping other campers with questions in the gitter chatrooms.</p>
  </header>  
);

const Footer = () => (
  <footer>
    &copy;2018 Miguel T Rivera
  </footer>
);

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Footer />
      </div>
    );
  }
}

export default App;
