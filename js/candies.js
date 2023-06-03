'use strict'

const CANDY = '🍬'
var gCandyInterval

function getCandyPos() {
    var emptyPos = []
    for (var i = 0; i < 1; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            var currCell = gBoard[i][j]
            if (currCell.gameObject === null) {
                currCell = { i: i, j: j }
                emptyPos.push(currCell)
            }
        }
    }
    var randIdx = getRandomInt(0, emptyPos.length)
    var pos = emptyPos[randIdx]
    return pos
}

function createCandy() {
    const gCandyPos = getCandyPos()
    updateCell(gCandyPos, CANDY)
    setTimeout(() => {
        updateCell(gCandyPos)
    }, 5000)
}

function getCandy() {
    gCandyInterval = setInterval(() => {
        createCandy()
    }, 10000)
}