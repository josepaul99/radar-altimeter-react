import React, { useEffect, useState } from 'react';
import './App.css';

import scale from './assets/radaltback.png';
import cover from './assets/radaltcover.png';
import needle from './assets/radaltneedle.png';
import bugImg from './assets/bug.png';
import flagImg from './assets/radaltflag.png';


function App() {

  return (
    <div>
      <h1>Radar Altimeter</h1>
      <div class="guage" >
        <img src={scale} class="scale" />
        <img src={needle} class="needle"/>
        <img src={bugImg} class="bugimg"/>
        <img src={flagImg} class="flagimg"/>
        <img src={cover} class="cover"/>
        <span class="circle"></span>
        </div>
        <br/>
        <div class="controls">
          Altitude: <input type="range" min="0" max="1500" value="0" id="altSlider"/><span>0</span>
          <br/>
          Bug: <input type="range" min="0" max="1500" value="0" id="powerSlider"/><span>0</span>
          <br/>
          Has power: <input type="checkbox" id="hasPower" />

        </div>
      
    </div>
  );
}

export default App;
