import React from './../../node_modules/react'

function Bishop(player, iconUrl) {
  return (
    {
      player,
      iconUrl,
      pieceType: 'bishop',
      style: {
        backgroundImage: `url(${player === 1? "https://upload.wikimedia.org/wikipedia/commons/b/b1/Chess_blt45.svg" : "https://upload.wikimedia.org/wikipedia/commons/9/98/Chess_bdt45.svg"})`
      },
      isMovePossible: function(src, dest){
        return (Math.abs(src - dest) % 9 === 0 || Math.abs(src - dest) % 7 === 0);
      },
      getSrcToDestPath: function(src, dest){
        let path = [], pathStart, pathEnd, incrementBy;
        if(src > dest){
          pathStart = dest;
          pathEnd = src;
        }
        else{
          pathStart = src;
          pathEnd = dest;
        }
        if(Math.abs(src - dest) % 9 === 0){
          incrementBy = 9;
          pathStart += 9;
        }
        else{
          incrementBy = 7;
          pathStart += 7;
        }
    
        for(let i = pathStart; i < pathEnd; i+=incrementBy){
          path.push(i);
        }
        return path;
      }
    }
  )
}

export default Bishop




// import Piece from './Piece.js';

// export default class Bishop extends Piece {
//   constructor(player){
//     super(player, (player === 1? "https://upload.wikimedia.org/wikipedia/commons/b/b1/Chess_blt45.svg" : "https://upload.wikimedia.org/wikipedia/commons/9/98/Chess_bdt45.svg"));
//   }

//   isMovePossible(src, dest){
//     return (Math.abs(src - dest) % 9 === 0 || Math.abs(src - dest) % 7 === 0);
//   }

//   /**
//    * get path between src and dest (src and dest exclusive)
//    * @param  {num} src  
//    * @param  {num} dest 
//    * @return {[array]}      
//    */
//   getSrcToDestPath(src, dest){
//     let path = [], pathStart, pathEnd, incrementBy;
//     if(src > dest){
//       pathStart = dest;
//       pathEnd = src;
//     }
//     else{
//       pathStart = src;
//       pathEnd = dest;
//     }
//     if(Math.abs(src - dest) % 9 === 0){
//       incrementBy = 9;
//       pathStart += 9;
//     }
//     else{
//       incrementBy = 7;
//       pathStart += 7;
//     }

//     for(let i = pathStart; i < pathEnd; i+=incrementBy){
//       path.push(i);
//     }
//     return path;
//   }
// }






