import React, { useEffect, useState } from 'react';
import './App.css';

import scale from './assets/radaltback.png';
import cover from './assets/radaltcover.png';
import needle from './assets/radaltneedle.png';
import bugImg from './assets/bug.png';
import flagImg from './assets/radaltflag.png';

let altExceedBug = false;
let altRecedeBug = false;
let lightOn = false;

function FlagImg(props) {
  if (props.poweron) {
    return null;
  }

  return (
    <img src={flagImg} class="scaleobjects" />
  );
}

function Needle(props) {
  let rotDeg;
  let style;
  let rotDegback;
  if (props.altVal <= 500) {
    rotDeg = (0.36 * props.altVal);
  }
  else if (props.altVal <= 1500) {
    rotDeg = (0.09 * (props.altVal - 500)) + 180;
  }
  rotDeg = rotDeg.toString();

  if (props.powVal) {
    style = {
      transform: "rotate(" + rotDeg + "deg)"
    };
    rotDegback = rotDeg;
  }
  else {
    style = {
      transform: "rotate(" + rotDegback + "deg)"
    };
  }

  return (
    <img src={needle} class="scaleobjects" style={style} />
  );

}


function BugImg(props) {
  let rotDeg;
  if (props.bugVal <= 500) {
    rotDeg = (0.36 * props.bugVal);
  }
  else if (props.bugVal <= 1500) {
    rotDeg = (0.09 * (props.bugVal - 500)) + 180;
  }
  rotDeg = rotDeg.toString();

  let style = {
    transform: "rotate(" + rotDeg + "deg)"
  };

  return (
    <img src={bugImg} class="scaleobjects" style={style} />
  );

}




function CoverLight(props) {


  if (altExceedBug == false) {
    if (props.powVal) {
      if ((props.altVal - props.bugVal) > 0) {
        altExceedBug = true
        console.log("AltExceedBug " + altExceedBug + ", altVal " + props.altVal + ", bugVal " + props.bugVal)
      }
    }
  }
  else {
    if (altRecedeBug == false) {
      if (props.powVal) {
        if ((props.altVal - props.bugVal) < 0) {
          altRecedeBug = true
          console.log("altRecedeBug " + altRecedeBug + ", altVal " + props.altVal + ", bugVal " + props.bugVal)
        }
      }
    }
  }

  if (altExceedBug) {
    if (altRecedeBug) {
      lightOn = true;
    }
    else {
      lightOn = false
    }
  }

  return (
    <span class={lightOn ? "circleon" : "circleoff"}></span>
  );
}


class Altimeter extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      powerOn: false,
      altitude: 0,
      bug: 0
    };
  }


  handlePowerOnClick() {
    this.setState(state => ({
      powerOn: !state.powerOn
    }));
    if (this.state.powerOn == true) {
      altExceedBug = false;
      altRecedeBug = false;
      lightOn = false
    }

  }

  handleAltChange(event) {
    this.setState(state => ({
      altitude: event.target.value,
    }));
  }

  handleBugChange(event) {
    this.setState({
      bug: event.target.value
    });

  }

  render() {
    return (
      <div>
        <h1>Radar Altimeter</h1>
        <div class="guage" >
          <img src={scale} class="scale" />
          <Needle altVal={this.state.altitude} powVal={this.state.powerOn} />
          <BugImg bugVal={this.state.bug} />
          <FlagImg poweron={this.state.powerOn} />
          <img src={cover} class="scaleobjects" />
          <CoverLight altVal={this.state.altitude} bugVal={this.state.bug} powVal={this.state.powerOn} />

        </div>
        <br />
        <br />

        <div class="controls">
          Altitude: <input type="range" min="0" max="1500" step="1" defaultValue={this.state.altitude} onChange={(e) => this.handleAltChange(e)} /><span>{this.state.altitude}</span>
          <br />
          Bug: <input type="range" min="0" max="1500" step="1" defaultValue={this.state.bug} onChange={(e) => this.handleBugChange(e)} /><span>{this.state.bug}</span>
          <br />
          Has power: <input type="checkbox" onChange={() => this.handlePowerOnClick()} />
        </div>
      </div>
    );
  }
}



function App() {

  return (
    <Altimeter />
  );
}

export default App;
