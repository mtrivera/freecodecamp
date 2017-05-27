//let origBoard: any[] = ['O', 1, 'X', 'X', 4, 'X', 6, 'O', 'O'];   //best move index 4
let gameBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8];
let human = {
    marker: undefined,
    turn: undefined,
    winsTotal: undefined
};
let ai = {
    marker: undefined,
    turn: undefined,
    winsTotal: undefined
};
let setup = document.getElementById('setup');
// Set markers for players and hide choice from user
setup.addEventListener('click', function (e) {
    if (e.target.id == 'X') {
        human.marker = 'X';
        ai.marker = 'O';
    }
    else {
        human.marker = 'O';
        ai.marker = 'X';
    }
    toggleVisibility(setup);
});
/*
TODO: Look into getElementsByTagName() or getElementsByClassName()
let game:any = document.getElementById('board');
game.addEventListener('click', function(e) {
  switch (e.target.id) {
  }
});
*/
/*// TEST
let bestSpot = minimax(gameBoard, ai.marker);
console.log("index: " + bestSpot.index);  // 4
*/
// TODO: Build this out
function markBoard(board, turn) {
    let index = undefined;
}
// Hide/show element
function toggleVisibility(elm) {
    if (elm.style.display == 'none') {
        elm.style.display = 'visible';
    }
    else {
        elm.style.display = 'none';
    }
}
function minimax(newBoard, player) {
    let availableSpots = emptyIndices(newBoard);
    //check for terminal state
    if (winningCombo(newBoard, human.marker)) {
        return { score: -10 };
    }
    else if (winningCombo(newBoard, ai.marker)) {
        return { score: 10 };
    }
    else if (availableSpots.length === 0) {
        return { score: 0 };
    }
    // An array to collect all the objects
    let moves = [];
    // Loop through available spots
    for (let count = 0; count < availableSpots.length; count += 1) {
        // Create an object for each and store the index of that spot
        let move = {
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
        }
        else {
            let result = minimax(newBoard, ai.marker);
            move.score = result.score;
        }
        // Reset spot to empty
        newBoard[availableSpots[count]] = move.index;
        // Push the object to the array
        moves.push(move);
    }
    // If its the computer's turn loop over the moves and choose
    let bestMove;
    if (player === ai.marker) {
        let bestScore = -10000;
        for (let ix = 0; ix < moves.length; ix += 1) {
            if (moves[ix].score > bestScore) {
                bestScore = moves[ix].score;
                bestMove = ix;
            }
        }
    }
    else {
        // Else loop over the moves and choose the move with the lowest score
        let bestScore = 10000;
        for (let jx = 0; jx < moves.length; jx += 1) {
            if (moves[jx].score < bestScore) {
                bestScore = moves[jx].score;
                bestMove = jx;
            }
        }
    }
    // Return the chosen object from the moves array
    return moves[bestMove];
}
// Returns list of the indices of empty spots on the board
function emptyIndices(board) {
    return board.filter(s => typeof (s) == 'number');
}
// Winning combinations using the board indices
function winningCombo(board, player) {
    if ((board[0] == player && board[1] == player && board[2] == player) ||
        (board[3] == player && board[4] == player && board[5] == player) ||
        (board[6] == player && board[7] == player && board[8] == player) ||
        (board[0] == player && board[3] == player && board[6] == player) ||
        (board[1] == player && board[4] == player && board[7] == player) ||
        (board[2] == player && board[5] == player && board[8] == player) ||
        (board[0] == player && board[4] == player && board[8] == player) ||
        (board[2] == player && board[4] == player && board[6] == player)) {
        return true;
    }
    else {
        return false;
    }
}
