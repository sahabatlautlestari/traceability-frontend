import React from 'react';
import '../../index.css';
var imageName = require('../../assets/not-found.png');

export default function NotFound(props) {
  return (
    <div className="center-image">
        <img src={imageName} alt="Product Not Found"/>
      </div>    
  );
}