import React, { Component } from "react";
import Odometer from "react-odometerjs";
import "odometer/themes/odometer-theme-digital.css";
import { Button, Input } from "@material-ui/core";
import CircularProgressbar from "react-circular-progressbar";
import song from './loneRanger.mp3';
import airHorn from './airHorn.mp3';

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
          width: "100vw",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          position: "relative"
        }}
      >
        <div
          style={{
            height: "100vh",
            width: "100vw",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute"
          }}
        >
          <div
            style={{
              flexDirection: "column",
              justifyContent: "center",
              position: "absolute",
              height: "575x",
              width: "575px"
            }}
          >
            <CircularProgressbar
              counterClockwise="false"
              percentage={(this.state.count / this.state.inputValue) * 100}
              styles={{
                path: {
                  stroke: `rgba(62, 152, 199)`
                },
                text: { fill: "#f88", fontSize: "16px" }
              }}
            />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center"
          }}
        >
          <audio id="loneRanger" id="loneRanger" src={song} />
          <audio id="airHorn" id="airHorn" src={airHorn} loop/>
          <Input
            onChange={this.handleInput}
            value={this.state.inputValue}
            placeholder="Time in Seconds"
          />
          <Button
            raised={true}
            color="primary"
            variant="contained"
            onClick={this.setTimer}
          >
            Set Timer (seconds)
          </Button>
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
          <Button
            raised={true}
            color="primary"
            variant="contained"
            onClick={this.start}
          >
            Start
          </Button>
          <Button
            raised={true}
            color="secondary"
            variant="contained"
            onClick={this.stop}
          >
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
          <Button
            style={{ backgroundColor: "black", color: "white" }}
            raised={true}
            onClick={this.reset}
          >
            Reset
          </Button>
         
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center"
          }}
        >
          <Button
            raised={true}
            onClick={this.silenceAirHorn}
          >
            Silence Air Horn 
          </Button>
         
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

  componentDidUpdate(){
    if (this.state.count ===0){
      document.getElementById("loneRanger").pause();
      if (this.state.clickCount > 0){
        document.getElementById("airHorn").play();
      }
    }
  }

  start = () => {
    document.getElementById("loneRanger").play();
    if (this.state.clickCount === 0) {
      this.test = setInterval(() => {
        this.setState(previousState => ({ count: previousState.count - 1 }));
      }, 1000);
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
      count: this.state.inputValue
    });
  };

  handleInput = e => {
    this.setState({
      inputValue: e.target.value
    });
  };

  handleEnterPressed = e => {
    if (e.key == "Enter") {
      this.setTimer();
    }
  };

  silenceAirHorn(){
    document.getElementById("airHorn").pause();
  }
}
