
import React, { CSSProperties } from 'react';

import '../index.css';

interface SquareProps {
  shade?: string;
  onClick?: () => void;
  style?: CSSProperties;
}

export default function Square(props: SquareProps) {
	
    return (
      <button className={"square " + props.shade}
      onClick={props.onClick}
      style={props.style}>
       
      </button>
    );
  
}