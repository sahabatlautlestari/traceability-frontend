import React from 'react';
import '../../index.css';
var imageName = require('../../assets/trace-go.png');

export default function Trace(props) {
  return (
    <div className="center-image">
        <img src={imageName} alt="TraceGO"/>
      </div>    
  );
}