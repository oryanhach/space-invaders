'use strict'

const ALIEN_SPEED = 500
var gAliensTopRowIdx = 0
var gAliensBottomRowIdx = 2
var gAliensDirection = 'right'
var lastDirection
var gIntervalAliens

// Freeze aliens - for testing
var gIsAlienFreeze = false

// Creates the aliens and place them on the board
function createAliens(board) {
    for (var i = gAliensTopRowIdx; i <= gAliensBottomRowIdx; i++) {
        for (var j = 4; j < 10; j++) {
            board[i][j].gameObject = ALIEN
        }
    }

}

// Moves the aliens one cell right
function shiftAliensRight(board) {
    if (gAliensDirection === 'right') {
        lastDirection = 'right'
        for (var i = gAliensTopRowIdx; i <= gAliensBottomRowIdx; i++) {
            for (var j = board[i].length - 1; j >= 0; j--) {
                if (board[i][j].gameObject === ALIEN) {
                    if (j >= board[i].length - 1) {
                        gAliensDirection = 'down'
                        return
                    }
                    gBoard[i][j + 1].gameObject = ALIEN
                    updateCell({ i: i, j: j + 1 }, ALIEN)
                    gBoard[i][j].gameObject = null
                    updateCell({ i, j })
                }
            }
        }
    }
}

// Moves the aliens one cell left
function shiftAliensLeft(board) {
    if (gAliensDirection === 'left') {
        lastDirection = 'left'
        for (var i = gAliensTopRowIdx; i <= gAliensBottomRowIdx; i++) {
            for (var j = 0; j < board[i].length; j++) {
                if (board[i][j].gameObject === ALIEN) {
                    if (j <= 0) {
                        gAliensDirection = 'down'
                        return
                    }
                    gBoard[i][j].gameObject = null
                    updateCell({ i, j })
                    gBoard[i][j - 1].gameObject = ALIEN
                    updateCell({ i: i, j: j - 1 }, ALIEN)
                }
            }
        }
    }
}

// Moves the aliens one cell down
function shiftAliensDown(board) {
    if (gAliensDirection === 'down') {
        for (var i = gAliensBottomRowIdx; i >= gAliensTopRowIdx; i--) {
            for (var j = 0; j < board[i].length; j++) {
                if (board[i][j].gameObject === ALIEN) {
                    gBoard[i][j].gameObject = null
                    updateCell({ i, j })
                    gBoard[i + 1][j].gameObject = ALIEN
                    updateCell({ i: i + 1, j: j }, ALIEN)
                }
            }
            if (lastDirection === 'right') {
                gAliensDirection = 'left'
            } else {
                gAliensDirection = 'right'
            }
        }
        gAliensTopRowIdx++
        gAliensBottomRowIdx++
        if (gAliensBottomRowIdx >= BOARD_SIZE - 2) {
            gGame.isOn = false
        }
        console.log(gAliensBottomRowIdx)

    }
}

function getDirection() {
    if (gIsAlienFreeze) return
    if (gGame.isOn) {
        switch (gAliensDirection) {
            case 'right':
                shiftAliensRight(gBoard)
                break
            case 'left':
                shiftAliensLeft(gBoard)
                break
            case 'down':
                shiftAliensDown(gBoard)
                break
            default:
                break
        }

    }
}

// Starts the aliens moving interval
function moveAliens() {
    gIntervalAliens = setInterval(() => {
        getDirection()
    }, ALIEN_SPEED)
}
