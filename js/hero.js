'use strict'

const LASER_SPEED = 80
var gCurrLaserPos
var gLaserInterval

var gHero = {
    pos: { i: 12, j: 5 },
    isShoot: false,
    isNegsKiller: false,
    isSuper: false,
    superNum: 3
}

function createHero(board) {
    board[gHero.pos.i][gHero.pos.j] = { type: SKY, gameObject: HERO }
}

function onKeyDown(ev) {
    if (!gGame.isOn || gGame.isPaused) return
    switch (ev.key) {
        // handle moving right
        case 'ArrowRight':
            moveHero(1)
            break
        // handle moving left
        case 'ArrowLeft':
            moveHero(-1)
            break
        // handle shooting
        case ' ':
            shoot()
            break
        case 'n':
            gHero.isNegsKiller = true
            showNegsKiller()
            break
        case 'x':
            if (gHero.superNum > 0) {
                gHero.isSuper = true
            }
            break
        default:
            break
    }
}

function moveHero(dir) {
    // checks for edges
    if (gHero.pos.j + dir < 0 || gHero.pos.j + dir > gBoard[0].length - 1) {
        return
    }
    // removes hero from old position
    updateCell(gHero.pos)
    // updates hero's new location
    gHero.pos.j += dir
    updateCell(gHero.pos, HERO)
}

function shoot() {
    if (!gHero.isSuper && !gHero.isShoot) LASER = '🔺'
    // disables multiple lasers
    if (!gHero.isShoot) {
        gHero.isShoot = true
        // laser position
        gCurrLaserPos = { i: gHero.pos.i - 1, j: gHero.pos.j }
        blinkLaser(gCurrLaserPos)
        if (gHero.isSuper) {
            LASER = '🔶'
            gLaserInterval = setInterval(moveLaser, LASER_SPEED / 3)
            gHero.superNum--
            renderSuperAttacks()
            gHero.isSuper = false
        } else {
            gLaserInterval = setInterval(moveLaser, LASER_SPEED)
        }
    }
}

function blinkLaser(pos) {
    if (gHero.isSuper) {
        updateCell(pos, '🔶')
    } else {
        updateCell(pos, LASER)
    }
    setTimeout(() => {
        updateCell(pos)
    }, LASER_SPEED)
}

function moveLaser() {
    var nextPos = { i: gCurrLaserPos.i - 1, j: gCurrLaserPos.j }
    var isHit = handleLaserHits(nextPos)
    updateCell(gCurrLaserPos)
    // if hitting an alien / edge, does not render laser again
    if (isHit) {
        clearInterval(gLaserInterval)
        gHero.isShoot = false
        return
    }
    gCurrLaserPos = nextPos
    updateCell(gCurrLaserPos, LASER)
}

function handleLaserHits(pos) {
    // handle edge of the board
    if (pos.i < 0) {
        if (gHero.isNegsKiller) {
            gHero.isNegsKiller = false
            removeNegsKiller()
        }
        return true
    }
    // handle hitting an alien
    if (gBoard[pos.i][pos.j].gameObject === ALIEN) {
        // remove the alien from the board
        handleAlienHit(pos)
        return true
    }
    // handle candies
    if (gBoard[pos.i][pos.j].gameObject === CANDY) {
        gGame.score += 50
        renderScore()
        updateCell(pos)
        gIsAliensFreeze = true
        clearInterval(gIntervalAliens)
        setTimeout(() => {
            gIsAliensFreeze = false
            moveAliens()
        }, 5000)
        return true
    }
    return false
}



