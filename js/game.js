'use strict'

const BOARD_SIZE = 14
const ALIENS_ROW_LENGTH = 8
const ALIENS_ROW_COUNT = 3

const HERO = '🤖'
const ALIEN = '👾'
const LASER = '🔺'
const SKY = 'SKY'
const EARTH = 'EARTH'

var gBoard
var gGame = {
    isOn: false,
    aliensCount: 24,
    score: 0
}

function onInit() {
    gGame.aliensCount = 24
    gGame.score = 0
    gBoard = createBoard()
    gHero.pos.i = 12
    gHero.pos.j = 5
    gAliensTopRowIdx = 0
    gAliensBottomRowIdx = 2
    gAlienDirection = 'right'
    clearInterval(gIntervalAliens)
    createHero(gBoard)
    createAliens(gBoard)
    renderBoard(gBoard)
    renderScore()
    moveAliens()
}

function createBoard() {
    var board = []
    for (var i = 0; i < BOARD_SIZE; i++) {
        board[i] = []
        for (var j = 0; j < BOARD_SIZE; j++) {
            board[i][j] = (i < 13) ? createCell() : { type: EARTH, gameObject: null }
        }
    }
    return board
}

function renderBoard(board) {
    var strHTML = '<table>'
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {
            const cell = board[i][j]
            const className = (cell.type === EARTH) ? 'cell earth' : 'cell sky'
            const cellImg = (cell.gameObject) ? cell.gameObject : ''
            strHTML += `<td class="${className}" data-i='${i}' data-j='${j}'>${cellImg}</td>`
        }
        strHTML += '</tr>'
    }
    strHTML += '</table>'
    const elContainer = document.querySelector('.board-container')
    elContainer.innerHTML = strHTML
}

function updateCell(pos, gameObject = null) {
    gBoard[pos.i][pos.j].gameObject = gameObject
    var elCell = getElCell(pos)
    elCell.innerHTML = (gameObject) ? gameObject : ''
}

function checkVictory() {
    if (gGame.aliensCount === 0) {
        gGame.isOn = false
        clearInterval(gLaserInterval)
        clearInterval(gIntervalAliens)
        console.log('You Win!')
        getStartButton()
    }
}

function gameLost() {
    gGame.isOn = false
    clearInterval(gLaserInterval)
    clearInterval(gIntervalAliens)
    console.log('You Lost!')
    getStartButton()
}

function renderScore() {
    var elScore = document.querySelector('.score span')
    elScore.innerText = gGame.score
}

function setNewGame() {
    gGame.isOn = true
    getRestartButton()
    onInit()
}

function getRestartButton() {
    var elButton = document.querySelector('.restart-btn')
    elButton.innerText = 'Restart'
}

function getStartButton() {
    var elButton = document.querySelector('.restart-btn')
    elButton.innerText = 'Start'
}


// TODO - go over the code, make it cleaner and check for duplicated code /inconsistent logic
// TODO - small bug - when losing, the first row of aliens is removed
// TODO - add freeze aliens button - trigger gIsAliensFreeze
// TODO - add victory / losing modal
// TODO - add blow up neighbors feature
// TODO - add Super mode feature
// TODO - add the design
// TODO - work on bonus tasks
// TODO - add sound effects
// TODO - if extra time - work on extra bonus (under 'go extreme section') features
// TODO - if extra time - work on high score - by time to victory > learn how to save scores

// TODO - only if extra time, try again fixing the bug - sometimes the laser catch 2 aliens / dont register hits at all
