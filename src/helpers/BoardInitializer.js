import Bishop from '../Pieces/Bishop.js';
import King from '../Pieces/King.js';
import Knight from '../Pieces/Knight.js';
import Pawn from '../Pieces/Pawn.js';
import Queen from '../Pieces/Queen.js';
import Rook from '../Pieces/Rook.js';

export default function initializeChessBoard(){
  const squares = Array(64).fill(null);

  for(let i = 8; i < 16; i++){
    squares[i] = Pawn(2);
    squares[i+40] = Pawn(1);
  }

  squares[0] = Rook(2);
  squares[7] = Rook(2);
  squares[56] = Rook(1);
  squares[63] = Rook(1);

  squares[1] = Knight(2);
  squares[6] = Knight(2);
  squares[57] = Knight(1);
  squares[62] = Knight(1);

  squares[2] = Bishop(2);
  squares[5] = Bishop(2);
  squares[58] = Bishop(1);
  squares[61] = Bishop(1);

  squares[3] = Queen(2);
  squares[4] = King(2);

  squares[59] = Queen(1);
  squares[60] = King(1);




  // squares[0] = { ...squares[0], squares}
  // squares[7] = { ...squares[7], squares}
  // squares[56] = { ...squares[56], squares}
  // squares[63] = { ...squares[63], squares}

  // squares[1] = { ...squares[1], squares}
  // squares[6] = { ...squares[6], squares}
  // squares[57] = { ...squares[57], squares}
  // squares[62] = { ...squares[62], squares}

  // squares[2] = { ...squares[2], squares}
  // squares[5] = { ...squares[5], squares}
  // squares[58] = { ...squares[58], squares}
  // squares[61] = { ...squares[61], squares}

  // squares[3] = { ...squares[3], squares}
  // squares[4] = { ...squares[4], squares}

  // squares[59] = { ...squares[59], squares}
  // squares[60] = { ...squares[60], squares}
  
  return squares;
}