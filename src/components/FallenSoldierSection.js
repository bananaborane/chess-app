import React from 'react'
import '../index.css';
import Square from './Square.js';

function FallenSoldierSection(props) {

  const renderSquare = (square, i, squareShade) => {
    return (<Square 
    piece = {square} 
    style = {square.style}
    />)
  }

  return (
    <div>
    <div className="board-row">{props.whiteFallenSoldiers.map((ws, index) =>
      renderSquare(ws, index)
      )}</div>
    <div className="board-row">{props.blackFallenSoldiers.map((bs, index) =>
      renderSquare(bs, index)
      )}</div>
    </div>
  )
}

export default FallenSoldierSection



// import React from 'react';

// import '../index.css';
// import Square from './Square.js';

// export default class FallenSoldierBlock extends React.Component {
  
//   renderSquare(square, i, squareShade) {
//     return <Square 
//     piece = {square} 
//     style = {square.style}
//     />
//   }

//   render() {
//     return (
//       <div>
//       <div className="board-row">{this.props.whiteFallenSoldiers.map((ws, index) =>
//         this.renderSquare(ws, index)
//         )}</div>
//       <div className="board-row">{this.props.blackFallenSoldiers.map((bs, index) =>
//         this.renderSquare(bs, index)
//         )}</div>
//       </div>
//       );
//     }
//   }
