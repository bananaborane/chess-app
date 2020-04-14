import React, { useState } from 'react';
import './../index.css';
import Board from './Board';
import FallenSoldierBlock from './FallenSoldierSection';
import initializeChessBoard from '../Helpers/BoardInitializer';

function Game() {
  let [squares, setSquares] = useState(initializeChessBoard())
  let [whiteFallenSoldiers, setWhiteFallenSoldiers] = useState([])
  let [blackFallenSoldiers, setBlackFallenSoldiers] = useState([])
  let [turn, setTurn] = useState((Math.round(Math.random())) ? 'white' : 'black')
  let [player, setPlayer] = useState((turn === 'white') ? 1 : 2)
  let [sourceSelection, setSourceSelection] = useState(-1)
  let [status, setStatus] = useState('')
  let [resetFlag, setResetFlag] = useState(false)
  
  
  const isMoveLegal = sourceToDestPath => {
    let isLegal = true;
    for(let i = 0; i < sourceToDestPath.length; i++){
      if(squares[sourceToDestPath[i]] !== null){
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

    // After correct piece is clicked, handles where piece can go:

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
        const sourceToDestPath = sqrs[sourceSelection].getSrcToDestPath(sourceSelection, i);
        const isMoveLegalOrNot = isMoveLegal(sourceToDestPath);

        if(isMovePossible && isMoveLegalOrNot){
          if(sqrs[i] !== null){
            if(sqrs[i].player === 1){
              whiteFSs.push(sqrs[i]);

            }
            else{
              blackFSs.push(sqrs[i]);
            }
          }
          
          if (sqrs[i] && sqrs[i].pieceType === 'king'){
            setStatus(`Player ${player} wins, reset?`)
            setResetFlag(true)
            return;
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

  const hasSomeoneWon = () => {
    if (resetFlag){
      return (<button onClick={e => resetGame(e)}>
        Reset Game
      </button>)
    }
    return null;
  }


  const resetGame = e => {
    e.preventDefault();
    setSquares(initializeChessBoard())
    setSourceSelection(-1)
    setWhiteFallenSoldiers([])
    setBlackFallenSoldiers([])
    setTurn( Math.round(Math.random()) ? 'white' : 'black' )
    setPlayer( (turn === 'white') ? 1 : 2 )
    setStatus('')
    setResetFlag(false)
  }


    /**
   * Check all path indices are null. For one steps move of pawn/others or jumping moves of knight array is empty, so  move is legal.
   * @param  {[type]}  sourceToDestPath [array of board indices comprising path between src and dest ]
   * @return {Boolean}               
   */
  


  return (
    <div>
    <div className="game">
      <div className="game-board">
        <Board 
        squares = {squares}
        onClick = {(i) => handleClick(i)}
        />
      </div>
      <div className="game-info">
        <h3>Turn</h3>
        <div id="player-turn-box" style={{backgroundColor: turn}}>

        </div>
        <div className="game-status">{status}</div>
        <div className='game-status'>{hasSomeoneWon()}</div>

        <div className="fallen-soldier-block">
          
          {<FallenSoldierBlock
          whiteFallenSoldiers = {whiteFallenSoldiers}
          blackFallenSoldiers = {blackFallenSoldiers}
          status={status}
          setStatus={setStatus}
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
