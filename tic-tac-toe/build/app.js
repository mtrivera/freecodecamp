'use strict';
let gameboard = [0, 1, 2, 3, 4, 5, 6, 7, 8];
let human = {
    marker: undefined,
    turn: undefined,
    win: 0,
    loss: 0,
    tie: 0
};
let ai = {
    marker: undefined,
    turn: undefined,
};
let setup = document.querySelector('#setup');
let msg = document.getElementById('message');
let record = document.getElementById('record');
// Set markers for players and hide choice from user
setup.addEventListener('click', function (e) {
    if (e.target.id == 'X') {
        human.marker = 'X';
        ai.marker = 'O';
        human.turn = true;
        ai.turn = false;
    }
    else {
        human.marker = 'O';
        ai.marker = 'X';
        // Run this since X always goes first
        aiFirstMove(gameboard, ai.marker, spots);
        human.turn = true;
        ai.turn = false;
    }
    setup.classList.add('hide');
});
let game = document.getElementById('board');
let spots = game.getElementsByTagName('div');
let terminal = false;
// When user clicks on board
let play = game.addEventListener('click', function (e) {
    if (human.turn) {
        let index = getSquareIndex(e.target.className);
        if (isSquareEmpty(gameboard, index)) {
            humanMarkBoard(gameboard, human.marker, spots, index);
            human.turn = false;
            ai.turn = true;
        }
        else {
            alert('Invalid Move');
        }
    }
    if (ai.turn) {
        aiMarkBoard(gameboard, ai, human, spots);
        human.turn = true;
        ai.turn = false;
    }
    // Check to see if game is over; if so, set terminal to true
    terminal = gameOver(gameboard, ai, human);
    record.textContent = displayRecord(human);
    // Resets game if terminal state found
    if (terminal) {
        gameboard = resetArr();
        playAgain(spots, ai, human);
        setup.classList.remove('hide');
        terminal = false;
        return;
    }
});
// Display win-loss-record for human player
function displayRecord(human) {
    return `${human.win}-${human.loss}-${human.tie}`;
}
// Mark the board first at a random position as AI
function aiFirstMove(board, player, place) {
    const min = 0;
    const max = 9;
    let randIndex = Math.floor(Math.random() * (max - min)) + min;
    board[randIndex] = player; // Mark the board once found
    place[randIndex].textContent = player;
}
// Mark the board as AI
function aiMarkBoard(board, ai, human, place) {
    if (emptyIndices(board).length === 0) {
        return;
    }
    else {
        let bestSpot = minimax(board, ai.marker); // Find best index for AI..
        board[bestSpot.index] = ai.marker; // Mark the board once found
        place[bestSpot.index].textContent = ai.marker;
    }
}
// Mark the board as the human player
function humanMarkBoard(board, player, place, index) {
    board[index] = player;
    place[index].textContent = player;
}
// Get the index of the square the user clicks on the gameboard
function getSquareIndex(squareName) {
    let index = undefined;
    const squares = ['square0', 'square1', 'square2', 'square3',
        'square4', 'square5', 'square6', 'square7', 'square8'];
    index = squares.indexOf(squareName);
    return index;
}
// Check to see if spot on gameboard is empty
function isSquareEmpty(board, index) {
    let emptySquare = undefined;
    if (typeof (board[index]) == 'number') {
        emptySquare = true;
    }
    else {
        emptySquare = false;
    }
    return emptySquare;
}
// Game is over when a terminal state is true
function gameOver(board, ai, human) {
    let terminal = undefined;
    if (winningCombo(board, ai.marker)) {
        terminal = true;
        human.loss += 1;
    }
    else if (winningCombo(board, human.marker)) {
        terminal = true;
        human.win += 1;
        //TODO: Tie requires extra click to reset game
    }
    else if (emptyIndices(board).length === 0) {
        terminal = true;
        human.tie += 1;
    }
    return terminal;
}
// Reset the HTML gameboard and players properties
function playAgain(place, ai, human) {
    resetGameboard(place);
    resetPlayerProperties(ai, human);
}
// Reset HTML gameboard
function resetGameboard(place) {
    // Create an array from HTMLCollection array-like object
    let arr = Array.from(place);
    arr.forEach(function (elm, index, arr) {
        arr[index].textContent = '';
    });
}
// Reset the gameboard array to default
function resetArr() {
    let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    return arr;
}
// Reset player properties
function resetPlayerProperties(ai, human) {
    ai.marker = undefined;
    ai.turn = undefined;
    human.marker = undefined;
    human.turn = undefined;
}
// Determine best move for AI using minimax algorithm
function minimax(newBoard, player) {
    let availableSpots = emptyIndices(newBoard);
    // Check for terminal state
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
