import React from 'react'

function King(player, iconUrl) {
  return (
    {
      player,
      iconUrl,
      style: {
        backgroundImage: `url(${player === 1? "https://upload.wikimedia.org/wikipedia/commons/4/42/Chess_klt45.svg" : "https://upload.wikimedia.org/wikipedia/commons/f/f0/Chess_kdt45.svg"})`
      },
      isMovePossible: function(src, dest){
        return (src - 9 === dest || 
          src - 8 === dest || 
          src - 7 === dest || 
          src + 1 === dest || 
          src + 9 === dest || 
          src + 8 === dest || 
          src + 7 === dest || 
          src - 1 === dest);
      },
      getSrcToDestPath: function(src, dest){
        return [];
      }
    }
  )
}

export default King





// import Piece from './Piece.js';

// export default class King extends Piece {
//   constructor(player){
//     super(player, (player === 1? "https://upload.wikimedia.org/wikipedia/commons/4/42/Chess_klt45.svg" : "https://upload.wikimedia.org/wikipedia/commons/f/f0/Chess_kdt45.svg"));
//   }

//   isMovePossible(src, dest){
//     return (src - 9 === dest || 
//       src - 8 === dest || 
//       src - 7 === dest || 
//       src + 1 === dest || 
//       src + 9 === dest || 
//       src + 8 === dest || 
//       src + 7 === dest || 
//       src - 1 === dest);
//   }

//   /**
//    * always returns empty array because of one step
//    * @return {[]}
//    */
//   getSrcToDestPath(src, dest){
//     return [];
//   }
// }