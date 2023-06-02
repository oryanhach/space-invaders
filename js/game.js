'use strict'

const BOARD_SIZE = 14
const ALIENS_ROW_LENGTH = 8
const ALIENS_ROW_COUNT = 3

const HERO = '🤖'
const ALIEN = '👾'
var LASER = '🔺'
const SKY = 'SKY'
const EARTH = 'EARTH'

var gBoard
var gGame = {
    isOn: false,
    isPaused: false,
    aliensCount: 24,
    score: 0,
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
    gIsAliensFreeze = false
    gHero.isNegsKiller = false
    gHero.isSuper = false
    gHero.superNum = 3
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
        getFreezeButton()
        getVictoryModal()
    }
}

function gameLost() {
    gGame.isOn = false
    clearInterval(gLaserInterval)
    clearInterval(gIntervalAliens)
    console.log('You Lost!')
    getStartButton()
    getFreezeButton()
}

function renderScore() {
    var elScore = document.querySelector('.score span')
    elScore.innerText = gGame.score
}

function setNewGame() {
    getRestartButton()
    getFreezeButton()
    removeNegsKiller()
    if (gGame.isPaused) getStopButton()
    gGame.isOn = true
    gGame.isPaused = false
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

function pauseGame() {
    if (gGame.isOn && !gGame.isPaused) {
        gGame.isPaused = true
        clearInterval(gIntervalAliens)
        clearInterval(gLaserInterval)
        getContinueButton()
    } else if (gGame.isOn && gGame.isPaused) {
        gGame.isPaused = false
        if (gHero.isShoot) {
            gLaserInterval = setInterval(moveLaser, LASER_SPEED)
        }
        moveAliens()
        getStopButton()
    }
}

function getContinueButton() {
    var elButton = document.querySelector('.pause-btn')
    elButton.innerText = 'Continue'
}

function getStopButton() {
    var elButton = document.querySelector('.pause-btn')
    elButton.innerText = 'Stop'
}

function getVictoryModal() {
    var elModal = document.querySelector('.modal span')
    elModal.innerText = 'You Won!'
}

function getLosingModal() {
    var elModal = document.querySelector('.modal span')
    elModal.innerText = 'You Lost!'
}

function showNegsKiller() {
    var elDisplay = document.querySelector('.negs-killer-display span')
    elDisplay.innerText = 'ON'
}

function removeNegsKiller() {
    var elDisplay = document.querySelector('.negs-killer-display span')
    elDisplay.innerText = 'OFF'
}

// TODO - show super attacks count
// TODO - add the design
// TODO - (BACKUP FIRST) - go over the code, make it cleaner and check for duplicated code /inconsistent logic
// TODO - work on bonus tasks
// TODO - add sound effects
// TODO - scan using Embold
// TODO - if extra time - work on extra bonus (under 'go extreme section') features
// TODO - if extra time - work on high score - by time to victory > learn how to save scores

// TODO - only if extra time, try again fixing the bug - sometimes the laser catch 2 aliens / dont register hits at all
