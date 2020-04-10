import React from "./../../node_modules/react";
import "../index.css";
import Square from "./Square.js";

function Board(props) {
  
  const renderSquare = (i, squareShade) => {
    return (
      <Square style={props.squares[i] ? props.squares[i].style : null} shade={squareShade} onClick={() => props.onClick(i)} />
      );
    }

    const board = [];
    
    const fillInBoard = board => {
      for (let i = 0; i < 8; i++) {
        const squareRows = [];
        for (let j = 0; j < 8; j++) {
          const squareShade =
          (isEven(i) && isEven(j)) || (!isEven(i) && !isEven(j))
          ? "light-square"
          : "dark-square";
          squareRows.push(renderSquare(i * 8 + j, squareShade));
        }
        board.push(<div className="board-row">{squareRows}</div>);
      }
      console.log('from board.js', board)
      
      return board;
    }
  
    
    return (
      <div>
        {fillInBoard(board)}
      </div>
  )
}


function isEven(num) {
  return num % 2 === 0;
}


export default Board



// import React from "react";
// import "../index.css";
// import Square from "./Square.js";

// export default class Board extends React.Component {
//   renderSquare(i, squareShade) {
//     return (
//       <Square
//         style={this.props.squares[i] ? this.props.squares[i].style : null}
//         shade={squareShade}
//         onClick={() => this.props.onClick(i)}
//       />
//     );
//   }

//   render() {
//     const board = [];
//     for (let i = 0; i < 8; i++) {
//       const squareRows = [];
//       for (let j = 0; j < 8; j++) {
//         const squareShade =
//           (isEven(i) && isEven(j)) || (!isEven(i) && !isEven(j))
//             ? "light-square"
//             : "dark-square";
//         squareRows.push(this.renderSquare(i * 8 + j, squareShade));
//       }
//       board.push(<div className="board-row">{squareRows}</div>);
//     }

//     return <div>{board}</div>;
//   }
// }

// function isEven(num) {
//   return num % 2 === 0;
// }
