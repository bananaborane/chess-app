import React, { useState } from 'react';
import '../index.css';
import Board from './Board.js';
import FallenSoldierBlock from './FallenSoldierSection.js';
import initializeChessBoard from '../helpers/BoardInitializer.js';

function Game() {

  let [squares, setSquares] = useState(initializeChessBoard())
  let [whiteFallenSoldiers, setWhiteFallenSoldiers] = useState([])
  let [blackFallenSoldiers, setBlackFallenSoldiers] = useState([])
  let [turn, setTurn] = useState((Math.round(Math.random())) ? 'white' : 'black')
  let [player, setPlayer] = useState((turn === 'white') ? 1 : 2)
  let [sourceSelection, setSourceSelection] = useState(-1)
  let [status, setStatus] = useState('')
  
  
  const isMoveLegal = srcToDestPath => {
    let isLegal = true;
    for(let i = 0; i < srcToDestPath.length; i++){
      if(squares[srcToDestPath[i]] !== null){
        isLegal = false;
      }
    }
    return isLegal;
  }
  
  const handleClick = i => {
    const sqrs = squares.slice();
    console.log(sqrs)
    
    // Checks if the correct piece is clicked

    if(sourceSelection === -1){
      if(!sqrs[i] || sqrs[i].player !== player){

        setStatus(`Wrong selection. Choose player ${player} pieces.`)
        if (sqrs[i]) {
          sqrs[i].style = {...sqrs[i].style, backgroundColor: ""};
        }
      }
      else{
        sqrs[i].style = {...sqrs[i].style, backgroundColor: "RGB(111,143,114)"}; 
        // sqrs[i+1].style = {...sqrs[i+1].style, backgroundColor: "RGB(111,143,114)"}; 
          setStatus("Choose destination for the selected piece")
          setSourceSelection(i)
        }
      }

    // After correct piece is clicked:

    else if(sourceSelection > -1){
      sqrs[sourceSelection].style = {...sqrs[sourceSelection].style, backgroundColor: ""};
      if(sqrs[i] && sqrs[i].player === player){
        setStatus("Wrong selection. Choose valid source and destination again.")
        setSourceSelection(-1)
      }
      else{
        
        const sqrs = squares.slice();
        const whiteFSs = whiteFallenSoldiers.slice();
        const blackFSs = blackFallenSoldiers.slice();
        const isDestEnemyOccupied = sqrs[i] ? true : false; 
        const isMovePossible = sqrs[sourceSelection].isMovePossible(sourceSelection, i, isDestEnemyOccupied);
        const srcToDestPath = sqrs[sourceSelection].getSrcToDestPath(sourceSelection, i);
        const isMoveLegalOrNot = isMoveLegal(srcToDestPath);

        if(isMovePossible && isMoveLegalOrNot){
          if(sqrs[i] !== null){
            if(sqrs[i].player === 1){
              whiteFSs.push(sqrs[i]);
            }
            else{
              blackFSs.push(sqrs[i]);
            }
          }
          sqrs[i] = sqrs[sourceSelection];
          sqrs[sourceSelection] = null;
          let plyr = player === 1 ? 2 : 1;
          let trn = turn === 'white' ? 'black' : 'white';
          setSourceSelection(-1)
          setSquares(sqrs)
          setWhiteFallenSoldiers(whiteFSs)
          setBlackFallenSoldiers(blackFSs)
          setPlayer(plyr)
          setStatus('')
          setTurn(trn)
        }
        else{
          setStatus("Wrong selection. Choose valid source and destination again.");
          setSourceSelection(-1)
        }
      }
    }

    
  }
  
  const suggestMoves = () => {

  }

    /**
   * Check all path indices are null. For one steps move of pawn/others or jumping moves of knight array is empty, so  move is legal.
   * @param  {[type]}  srcToDestPath [array of board indices comprising path between src and dest ]
   * @return {Boolean}               
   */

  


  return (
    <div>
    <div className="game">
      <div className="game-board">
        <Board 
        squares = {squares}
        onClick = {(i) => handleClick(i)}
        suggestMoves={suggestMoves}
        />
      </div>
      <div className="game-info">
        <h3>Turn</h3>
        <div id="player-turn-box" style={{backgroundColor: turn}}>

        </div>
        <div className="game-status">{status}</div>

        <div className="fallen-soldier-block">
          
          {<FallenSoldierBlock
          whiteFallenSoldiers = {whiteFallenSoldiers}
          blackFallenSoldiers = {blackFallenSoldiers}
          />
        }
        </div>
        
      </div>
    </div>

    <div className="icons-attribution">
      <div> <small> Chess Icons And Favicon (extracted) By en:User:Cburnett [<a href="http://www.gnu.org/copyleft/fdl.html">GFDL</a>, <a href="http://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA-3.0</a>, <a href="http://opensource.org/licenses/bsd-license.php">BSD</a> or <a href="http://www.gnu.org/licenses/gpl.html">GPL</a>], <a href="https://commons.wikimedia.org/wiki/Category:SVG_chess_pieces">via Wikimedia Commons</a> </small></div>
    </div>
  </div>

  )
}

export default Game



// import React from 'react';
// import '../index.css';
// import Board from './Board.js';
// import FallenSoldierBlock from './FallenSoldierSection.js';
// import initialiseChessBoard from '../helpers/BoardInitializer.js';

// export default class Game extends React.Component {
//   constructor(){
//     super();
//     this.state = {
//       squares: initialiseChessBoard(),
//       whiteFallenSoldiers: [],
//       blackFallenSoldiers: [],
//       player: 1,
//       sourceSelection: -1,
//       status: '',
//       turn: 'white'
//     }
//   }
 
//   handleClick(i){
//     const squares = this.state.squares.slice();
    
//     if(this.state.sourceSelection === -1){
//       if(!squares[i] || squares[i].player !== this.state.player){
//         this.setState({status: "Wrong selection. Choose player " + this.state.player + " pieces."});
//         if (squares[i]) {
//           squares[i].style = {...squares[i].style, backgroundColor: ""};
//         }
//       }
//       else{
//         squares[i].style = {...squares[i].style, backgroundColor: "RGB(111,143,114)"}; // Emerald from http://omgchess.blogspot.com/2015/09/chess-board-color-schemes.html
//         this.setState({
//           status: "Choose destination for the selected piece",
//           sourceSelection: i
//         });
//       }
//     }

//     else if(this.state.sourceSelection > -1){
//       squares[this.state.sourceSelection].style = {...squares[this.state.sourceSelection].style, backgroundColor: ""};
//       if(squares[i] && squares[i].player === this.state.player){
//         this.setState({
//           status: "Wrong selection. Choose valid source and destination again.",
//           sourceSelection: -1,
//         });
//       }
//       else{
        
//         const squares = this.state.squares.slice();
//         const whiteFallenSoldiers = this.state.whiteFallenSoldiers.slice();
//         const blackFallenSoldiers = this.state.blackFallenSoldiers.slice();
//         const isDestEnemyOccupied = squares[i]? true : false; 
//         const isMovePossible = squares[this.state.sourceSelection].isMovePossible(this.state.sourceSelection, i, isDestEnemyOccupied);
//         const srcToDestPath = squares[this.state.sourceSelection].getSrcToDestPath(this.state.sourceSelection, i);
//         const isMoveLegal = this.isMoveLegal(srcToDestPath);

//         if(isMovePossible && isMoveLegal){
//           if(squares[i] !== null){
//             if(squares[i].player === 1){
//               whiteFallenSoldiers.push(squares[i]);
//             }
//             else{
//               blackFallenSoldiers.push(squares[i]);
//             }
//           }
//           squares[i] = squares[this.state.sourceSelection];
//           squares[this.state.sourceSelection] = null;
//           let player = this.state.player === 1? 2: 1;
//           let turn = this.state.turn === 'white'? 'black' : 'white';
//           this.setState({
//             sourceSelection: -1,
//             squares: squares,
//             whiteFallenSoldiers: whiteFallenSoldiers,
//             blackFallenSoldiers: blackFallenSoldiers,
//             player: player,
//             status: '',
//             turn: turn
//           });
//         }
//         else{
//           this.setState({
//             status: "Wrong selection. Choose valid source and destination again.",
//             sourceSelection: -1,
//           });
//         }
//       }
//     }

//   }

//   /**
//    * Check all path indices are null. For one steps move of pawn/others or jumping moves of knight array is empty, so  move is legal.
//    * @param  {[type]}  srcToDestPath [array of board indices comprising path between src and dest ]
//    * @return {Boolean}               
//    */
//   isMoveLegal(srcToDestPath){
//     let isLegal = true;
//     for(let i = 0; i < srcToDestPath.length; i++){
//       if(this.state.squares[srcToDestPath[i]] !== null){
//         isLegal = false;
//       }
//     }
//     return isLegal;
//   }

//   render() {

//     return (
//       <div>
//         <div className="game">
//           <div className="game-board">
//             <Board 
//             squares = {this.state.squares}
//             onClick = {(i) => this.handleClick(i)}
//             />
//           </div>
//           <div className="game-info">
//             <h3>Turn</h3>
//             <div id="player-turn-box" style={{backgroundColor: this.state.turn}}>
  
//             </div>
//             <div className="game-status">{this.state.status}</div>

//             <div className="fallen-soldier-block">
              
//               {<FallenSoldierBlock
//               whiteFallenSoldiers = {this.state.whiteFallenSoldiers}
//               blackFallenSoldiers = {this.state.blackFallenSoldiers}
//               />
//             }
//             </div>
            
//           </div>
//         </div>

//         <div className="icons-attribution">
//           <div> <small> Chess Icons And Favicon (extracted) By en:User:Cburnett [<a href="http://www.gnu.org/copyleft/fdl.html">GFDL</a>, <a href="http://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA-3.0</a>, <a href="http://opensource.org/licenses/bsd-license.php">BSD</a> or <a href="http://www.gnu.org/licenses/gpl.html">GPL</a>], <a href="https://commons.wikimedia.org/wiki/Category:SVG_chess_pieces">via Wikimedia Commons</a> </small></div>
//         </div>
//       </div>

     
//       );
//   }
// }