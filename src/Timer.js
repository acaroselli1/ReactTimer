import React, { Component } from "react";

export default class Time extends Component {
  // default values

  test = 0;

  constructor(props) {
    super(props);

    this.state = {
      count: 1,
      clickCount: 0,
      inputValue:''
    };
  }

  render() {
    return (
      <div>
        <input onChange={this.handleInput} value={this.state.inputValue} placeholder="Set Timer"></input>
        <button onClick={this.setTimer}>Set Timer</button>
        <h1>Current Count: {this.state.count}</h1>
        <button onClick={this.start}>Start</button>
        <button onClick={this.stop}>Stop</button>
        <button onClick={this.reset}>Reset</button>
      </div>
    );
  }

  // actions
  componentDidMount() {
    this.setState({
      count: this.props.startCount
    });
  }

  start = () => {
    if (this.state.clickCount === 0) {
      this.test = setInterval(() => {
        this.setState(previousState => ({ count: previousState.count - 1 }));
      }, 1000);
      this.setState(
          previousState=>(
            {clickCount: previousState.clickCount + 1}
          )
        
      );
    }
  };

  stop = () => {
    clearInterval(this.test);
  };

  reset = () =>{
    this.setState({
        clickCount: 0,
        count:this.props.startCount
      });
  }

  setTimer=(e)=>{
      this.setState({
          count:this.state.inputValue,
          inputValue:''
      })
      
  }

  handleInput =(e)=>{
    this.setState({
        inputValue:e.target.value
    })
  }
}
