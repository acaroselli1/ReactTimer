import React, { Component } from "react";
import Odometer from "react-odometerjs";
import "odometer/themes/odometer-theme-digital.css";
import { Button, Input } from "@material-ui/core";

export default class Time extends Component {
  // default values

  test = 0;

  constructor(props) {
    super(props);

    this.state = {
      count: 1,
      clickCount: 0,
      inputValue: ""
    };
  }

  render() {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center"
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center"
          }}
        >
          <Input
            onChange={this.handleInput}
            value={this.state.inputValue}
            placeholder="Timer Value"
          />
          <Button onClick={this.setTimer}>Set Timer</Button>
        </div>
        <h1 style={{ fontFamily: "Orbitron, sans-serif" }}>
          Current Count:{" "}
          <Odometer value={this.state.count >= 0 ? this.state.count : "0"} />
        </h1>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center"
          }}
        >
          <Button color="primary" variant="outlined" onClick={this.start}>
            Start
          </Button>
          <Button color="secondary" variant="outlined" onClick={this.stop}>
            Stop
          </Button>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center"
          }}
        >
          <Button onClick={this.reset}>Reset</Button>
        </div>
      </div>
    );
  }

  // actions
  componentDidMount() {
    window.addEventListener("keydown", this.handleEnterPressed);
    this.setState({
      count: this.props.startCount
    });
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleEnterPressed);
  }

  start = () => {
    if (this.state.clickCount === 0) {
      this.test = setInterval(() => {
        this.setState(previousState => ({ count: previousState.count - 1 }));
      }, 100);
      this.setState(previousState => ({
        clickCount: previousState.clickCount + 1
      }));
    }
  };

  stop = () => {
    clearInterval(this.test);
  };

  reset = () => {
    this.setState({
      clickCount: 0,
      count: this.props.startCount
    });
  };

  setTimer = e => {
    this.setState({
      count: this.state.inputValue,
      inputValue: ""
    });
  };

  handleInput = e => {
    this.setState({
      inputValue: e.target.value
    });
  };

  handleEnterPressed=(e) => {
    if (e.key == "Enter") {
      this.setTimer();
    }
  }
}
