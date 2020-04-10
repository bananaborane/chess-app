
import React from './../../node_modules/react';

import '../index.css';

export default function Square(props) {
	
    return (
      <button className={"square " + props.shade}
      onClick={props.onClick}
      style={props.style}>
       
      </button>
    );
  
}