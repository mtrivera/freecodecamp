interface MoveConfig {
  index: number,
  score: number
}

interface PlayerConfig {
  marker: string,
  winsTotal: number
}

let origBoard: any[] = ['O', 1, 'X', 'X', 4, 'X', 6, 'O', 'O'];

let human:PlayerConfig = {
  marker: 'O',
  winsTotal: undefined
};

let ai:PlayerConfig = {
  marker: 'X',
  winsTotal: undefined
};
/* TEST
let bestSpot = minimax(origBoard, ai.marker);
console.log("index: " + bestSpot.index);  // 4
*/
function minimax(newBoard: any[], player: string) {
  let availableSpots: number[] = emptyIndices(newBoard);

  //check for terminal state
  if (winningCombo(newBoard, human.marker)) {
    return {score: -10};
  } else if (winningCombo(newBoard, ai.marker)) {
    return {score: 10};
  } else if (availableSpots.length === 0) {
    return {score: 0};
  }

  // An array to collect all the objects
  let moves: any[] = [];

  // Loop through available spots
  for (let count: number = 0; count < availableSpots.length; count += 1) {
    // Create an object for each and store the index of that spot
    let move:MoveConfig = {
      index: undefined,
      score: undefined
    };
    move.index = newBoard[availableSpots[count]];

    // Set empty spot to current player
    newBoard[availableSpots[count]] = player;

    /*
     Collect the score resulted from calling miniMax
     on the opponent of the current player
    */
    if (player == ai.marker) {
      let result = minimax(newBoard, human.marker);
      move.score = result.score;
    } else {
      let result = minimax(newBoard, ai.marker);
      move.score = result.score;
    }

    // Reset spot to empty
    newBoard[availableSpots[count]] = move.index;

    // Push the object to the array
    moves.push(move);
  }

  // If its the computer's turn loop over the moves and choose
  let bestMove: number;
  if (player === ai.marker) {
    let bestScore: number = -10000;
    for (let ix: number = 0; ix < moves.length; ix += 1) {
      if (moves[ix].score > bestScore) {
        bestScore = moves[ix].score;
        bestMove = ix;
      }
    }
  } else {
  // Else loop over the moves and choose the move with the lowest score
    let bestScore: number = 10000;
    for (let jx: number = 0; jx < moves.length; jx += 1) {
      if (moves[jx].score < bestScore){
        bestScore = moves[jx].score;
        bestMove = jx;
      }
    }
  }

  // Return the chosen object from the moves array
  return moves[bestMove];
}
// Returns list of the indices of empty spots on the board
function emptyIndices(board: any[]) {
  return board.filter(s => typeof(s) == 'number');
}
// Winning combinations using the board indices
function winningCombo(board: any[], player: string) {
  if ((board[0] == player && board[1] == player && board[2] == player) ||
   (board[3] == player && board[4] == player && board[5] == player) ||
   (board[6] == player && board[7] == player && board[8] == player) ||
   (board[0] == player && board[3] == player && board[6] == player) ||
   (board[1] == player && board[4] == player && board[7] == player) ||
   (board[2] == player && board[5] == player && board[8] == player) ||
   (board[0] == player && board[4] == player && board[8] == player) ||
   (board[2] == player && board[4] == player && board[6] == player)
   ) {
    return true;
  } else {
    return false;
  }
}
