'use strict'

const BOARD_SIZE = 14
const ALIENS_ROW_LENGTH = 8
const ALIENS_ROW_COUNT = 3

const HERO = '♆'
const ALIEN = '👽'
const LASER = '⤊'

var gScore
var gBoard
var gGame = {
    isOn: false,
    aliensCount: 0,
}

// Initialize the game
function init() {
    gAliensTopRowIdx = 0
    gAliensBottomRowIdx = 2
    gScore = 0
    gGame.aliensCount = 0
    gGame.isOn = true
    gBoard = createBoard(BOARD_SIZE)
    createHero(gBoard)
    createAliens(gBoard)
    renderBoard(gBoard)
    renderScore()
    moveAliens()
}

// Creates a board (model)
function createBoard(size) {
    var board = []
    for (var i = 0; i < size; i++) {
        board[i] = []
        for (var j = 0; j < size; j++) {
            board[i][j] = {
                type: (i === size - 1) ? 'earth' : 'sky',
                gameObject: null
            }
        }
    }
    return board
}

// Renders the board (DOM)
function renderBoard(board) {
    var strHTML = '<table>'
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {
            const currCell = board[i][j]
            // gives individual classes
            var className = 'cell'
            className += (currCell.type === 'earth') ? ' earth' : ' sky'
            if (currCell.gameObject === HERO) className += ' hero'
            if (currCell.gameObject === ALIEN) className += ' alien'
            var currObject = (currCell.gameObject) ? currCell.gameObject : ' '
            strHTML += `<td data-i=${i} data-j=${j} class="${className}">${currObject}</td>`
        }
        strHTML += '</tr>'
    }
    strHTML += '</table>'
    const elContainer = document.querySelector('.board-container')
    elContainer.innerHTML = strHTML
}

// Renders the cell
function updateCell(pos, gameObject = null) {
    gBoard[pos.i][pos.j].gameObject = gameObject
    var elCell = getElCell(pos)
    elCell.innerHTML = gameObject || ''
}

// Renders the score
function renderScore() {
    var elScore = document.querySelector('.score span')
    elScore.innerText = gScore
}

// Check if game won
function checkVictory() {
    if (gGame.aliensCount === 18) {
        gGame.isOn = false
        console.log('You won!')
    }
}

// TODO - Add a losing function
// TODO - Create a win /lose modal
// TODO - add a feature, when killing bottom line, bottom line index decrease -1
// TODO - BUG - sometimes the laser gets more than one alien at the same time