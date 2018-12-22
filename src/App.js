import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Timer from "./Timer";
class App extends Component {
  render() {
    return (
      <div className="App">
        <Timer startCount={0}/>
      </div>
    );
  }
}

export default App;
