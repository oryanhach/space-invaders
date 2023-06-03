'use strict'

const ALIEN_SPEED = 500
var gIntervalAliens

var gAliensTopRowIdx
var gAliensBottomRowIdx
var gAlienDirection = 'right'
var gLastDirection


// freeze aliens for testing
var gIsAliensFreeze = false

function createAliens(board) {
    for (var i = 0; i < ALIENS_ROW_COUNT; i++) {
        for (var j = 3; j < ALIENS_ROW_LENGTH + 3; j++) {
            board[i][j] = { type: SKY, gameObject: ALIEN }
        }
    }
}

function handleAlienHit(pos) {
    if (gHero.isNegsKiller) {
        blowUpNegs(pos)
    }
    updateCell(pos)
    gGame.score += 10
    gGame.aliensCount--
    checkVictory()
    renderScore()
}

function blowUpNegs(pos) {
    for (var i = pos.i - 1; i <= pos.i + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue
        for (var j = pos.j - 1; j <= pos.j + 1; j++) {
            if (i === pos.i && j === pos.j) continue
            if (j < 0 || j >= gBoard[0].length) continue
            var currCell = gBoard[i][j]
            var currPos = { i: i, j: j }
            if (currCell.gameObject === ALIEN) {
                updateCell(currPos)
                gGame.score += 10
                gGame.aliensCount--
                renderScore()
            }
        }
    }
    gHero.isNegsKiller = false
    removeNegsKiller()
    checkVictory()
    return
}

function moveAliensRight(board) {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = gBoard[i].length - 1; j >= 0; j--) {
            if (board[i][j].gameObject === ALIEN) {
                if (j + 1 < gBoard[i].length) {
                    board[i][j].gameObject = null
                    board[i][j + 1].gameObject = ALIEN
                } else {
                    return
                }
            }
        }
    }
    gLastDirection = 'right'
    renderBoard(gBoard)
}

function moveAliensLeft(board) {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            if (board[i][j].gameObject === ALIEN) {
                if (j - 1 >= 0) {
                    board[i][j].gameObject = null
                    board[i][j - 1].gameObject = ALIEN
                } else {
                    return
                }
            }
        }
    }
    gLastDirection = 'left'
    renderBoard(gBoard)
}

function moveAliensDown(board) {
    for (var i = gAliensBottomRowIdx; i >= gAliensTopRowIdx; i--) {
        for (var j = 0; j < gBoard[i].length; j++) {
            if (board[i][j].gameObject === ALIEN) {
                if (i + 3 < gBoard.length) {
                    board[i][j].gameObject = null
                    board[i + 1][j].gameObject = ALIEN
                } else {
                    gameLost()
                    return
                }
            }
        }
    }
    gAliensTopRowIdx++
    gAliensBottomRowIdx++
    renderBoard(gBoard)
}

function moveAliens() {
    if (gIsAliensFreeze || !gGame.isOn) return
    gIntervalAliens = setInterval(() => {
        if (gAlienDirection === 'right') {
            moveAliensRight(gBoard)
            if (checkRightEdge()) {
                gAlienDirection = 'down'
            }
        } else if (gAlienDirection === 'down') {
            moveAliensDown(gBoard)
            if (gLastDirection === 'right') {
                gAlienDirection = 'left'
            } else {
                gAlienDirection = 'right'
            }
        } else if (gAlienDirection === 'left') {
            moveAliensLeft(gBoard)
            if (checkLeftEdge()) {
                gAlienDirection = 'down'
            }
        }
    }, ALIEN_SPEED)
}

function checkRightEdge() {
    for (var i = 0; i < gBoard.length; i++) {
        if (gBoard[i][gBoard[i].length - 1].gameObject === ALIEN) {
            return true
        }
    }
    return false
}

function checkLeftEdge() {
    for (var i = 0; i < gBoard.length; i++) {
        if (gBoard[i][0].gameObject === ALIEN) {
            return true
        }
    }
    return false
}

function freezeAliens() {
    if (!gGame.isOn || gGame.isPaused) return
    if (!gIsAliensFreeze) {
        gIsAliensFreeze = true
        clearInterval(gIntervalAliens)
        getUnfreezeButton()
    } else {
        gIsAliensFreeze = false
        moveAliens()
        getFreezeButton()
    }


}

function getUnfreezeButton() {
    var elButton = document.querySelector('.freeze-btn')
    elButton.innerText = 'Unfreeze'
}

function getFreezeButton() {
    var elButton = document.querySelector('.freeze-btn')
    elButton.innerText = 'Freeze'
}
