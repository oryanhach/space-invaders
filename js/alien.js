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