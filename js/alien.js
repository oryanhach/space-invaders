'use strict'

const ALIEN_SPEED = 500
var gIntervalAliens

var gAliensTopRowIdx = 0
var gAliensBottomRowIdx = 2

var gIsAlienFreeze = true

// Creates the aliens and place them on the board
function createAliens(board) {
    for (var i = gAliensTopRowIdx; i <= gAliensBottomRowIdx; i++) {
        for (var j = 4; j < 10; j++) {
            board[i][j].gameObject = ALIEN
        }
    }

}

// TODO - handle this function
function handleAlienHit(pos) {

}

// Moves the aliens one cell right
function shiftAliensRight(board) {
    for (var i = gAliensTopRowIdx; i <= gAliensBottomRowIdx; i++) {
        for (var j = board[i].length - 1; j >= 0; j--) {
            if (board[i][j].gameObject === ALIEN) {
                gBoard[i][j].gameObject = null
                updateCell({ i, j })
                gBoard[i][j + 1].gameObject = ALIEN
                updateCell({ i: i, j: j + 1 }, ALIEN)
            }
        }
    }
}

// Moves the aliens one cell left
function shiftAliensLeft(board) {
    for (var i = gAliensTopRowIdx; i <= gAliensBottomRowIdx; i++) {
        for (var j = 0; j < board[i].length; j++) {
            if (board[i][j].gameObject === ALIEN) {
                gBoard[i][j].gameObject = null
                updateCell({ i, j })
                gBoard[i][j - 1].gameObject = ALIEN
                updateCell({ i: i, j: j - 1 }, ALIEN)
            }
        }
    }
}

// Moves the aliens one cell down
function shiftAliensDown(board) {
    for (var i = gAliensBottomRowIdx; i >= gAliensTopRowIdx; i--) {
        for (var j = 0; j < board[i].length; j++) {
            if (board[i][j].gameObject === ALIEN) {
                gBoard[i][j].gameObject = null
                updateCell({ i, j })
                gBoard[i + 1][j].gameObject = ALIEN
                updateCell({ i: i + 1, j: j }, ALIEN)
            }
        }
    }
    gAliensTopRowIdx++
    gAliensBottomRowIdx++
}

// Starts the aliens moving interval
function moveAliens() {
    gIntervalAliens = setInterval(() => {
        shiftAliensRight(gBoard)
    }, 1000)
}
