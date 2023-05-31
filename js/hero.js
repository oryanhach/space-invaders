'use strict'

const LASER_SPEED = 80

var gHero = {
    pos: { i: null, j: null },
    isShoot: false,
}

// Creates the hero and place it on the board
function createHero(board) {
    gHero.pos.i = 12
    gHero.pos.j = 5
    var heroPosition = gHero.pos
    board[heroPosition.i][heroPosition.j].gameObject = HERO
}

// Self reminder \\
// Movement mechanism: onKeyDown reads clicked key > moveHero gets next cell > updateCell renders new & old cell

// Handle game keys
function onKeyDown(ev) {
    if (!gGame.isOn) return

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
        if (nextCell.j + 1 === gBoard.length) {
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
    if (gHero.isShoot) return
    if (!gHero.isShoot) gHero.isShoot = true
    var currLaserPos = {
        i: gHero.pos.i,
        j: gHero.pos.j,
    }
    blinkLaser(currLaserPos)
}

function blinkLaser(pos) {
    
    pos.i--
    if (pos.i < 0) {
        gHero.isShoot = false
        return
    }
    var cell = gBoard[pos.i][pos.j]

    // Check if the laser hits an alien
    if (cell.gameObject === ALIEN) {
        updateCell(pos, '')
        gGame.aliensCount++
        gScore += 10
        renderScore()
        gHero.isShoot = false
        checkVictory()
        cell.gameObject = null
        return
    }

    // Check if the laser reaches the top of the board
    if (pos.i < 0) {
        updateCell(pos, '')
        return
    }

    // Update the cell with the laser
    cell.gameObject = LASER
    updateCell(pos, LASER)

    setTimeout(() => {
        updateCell(pos, '') // Clear the current cell
        blinkLaser(pos) // Continue to the next cell
    }, LASER_SPEED)
}




