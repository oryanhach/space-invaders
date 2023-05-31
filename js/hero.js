'use strict'

const LASER_SPEED = 80
var gHero = {
    pos: { i: 12, j: 5 },
    isShoot: false,
}

// Creates the hero and place it on the board
function createHero(board) {
    var heroPosition = gHero.pos
    board[heroPosition.i][heroPosition.j].gameObject = HERO
}

// Self reminder \\
// Movement mechanism: onKeyDown reads clicked key > moveHero gets next cell > updateCell renders new & old cell

// Handle game keys
function onKeyDown(ev) {

    // Checks for movement keys
    if (ev.code === 'ArrowRight') {
        moveHero('right')
    } else if (ev.code === 'ArrowLeft') {
        moveHero('left')
    }
    // Checks for shooting key
    if (ev.code === 'Space') {
        shoot()
    }

}

// Moves the hero
function moveHero(dir) {
    var nextCell = {
        i: gHero.pos.i,
        j: gHero.pos.j
    }
    if (dir === 'right') {
        // cant move past limits
        if (nextCell.j + 1 == gBoard.length) {
            return
        } else {
            nextCell.j++
        }
    } else {
        // cant move past limits
        if (nextCell.j - 1 === -1) {
            return
        } else {
            nextCell.j--
        }
    }

    // removes hero from old cell
    updateCell(gHero.pos, '')

    // renders new hero location on the board
    // DOM:
    updateCell(nextCell, HERO)
    // Model:
    gHero.pos.i = nextCell.i
    gHero.pos.j = nextCell.j
}

function shoot() {
    blinkLaser(gHero.pos)
}

function blinkLaser(pos) {
    // display:
    // Model
    gBoard[pos.i][pos.j].gameObject = LASER
    // DOM
    updateCell(pos, LASER)

    // hide:
    // setTimeout(()=>())
    // Model
    gBoard[pos.i][pos.j].gameObject = null
    // DOM
    updateCell(pos)

}


