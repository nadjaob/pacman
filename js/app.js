// GRID CREATION

const grid = document.querySelector('.grid')

const width = 21
const cellCount = width * width // 441 cells
const cells = [] // contains divs
const walls = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 31, 41,
  42, 44, 45, 47, 48, 49, 50, 52, 54, 55, 56, 57, 59, 60, 62, 63, 83,
  84, 86, 87, 89, 90, 92, 93, 94, 95, 96, 98, 99, 101, 102, 104, 105, 110, 111, 115, 119, 120, 125,
  126, 127, 128, 129, 131, 132, 133, 134, 136, 138, 139, 140, 141, 143, 144, 145, 146,
  150, 152, 153, 161, 162, 164, 168, 169, 170, 171, 173, 174, 176, 177, 179, 180, 182, 183, 185, 186, 187, 188,
  197, 201, 210, 211, 212, 213, 215, 216, 218, 219, 220, 221, 222, 224, 225, 227, 228, 229, 230,
  234, 236, 237, 245, 246, 248, 252, 253, 254, 255, 257, 258, 260, 261, 262, 263, 264, 266, 267, 269, 270, 271, 272,
  273, 283, 293, 294, 296, 297, 299, 300, 301, 302, 304, 306, 307, 308, 309, 311, 312, 314,
  315, 318, 332, 335, 336, 337, 339, 341, 342, 344, 345, 346, 347, 348, 350, 351, 353, 355, 356,
  357, 362, 363, 367, 371, 372, 377, 378, 380, 381, 382, 383, 384, 385, 386, 388, 390, 391, 392, 393, 394, 395, 396, 398,
  399, 419, 420, 421, 422, 423, 424, 425, 426, 427, 428, 429, 430, 431, 432, 433, 434, 435, 436, 437, 438, 439, 440]
const cage = [178, 198, 199, 200]
const powerPallets = [43, 61, 316, 334]
const emptyCells = [147, 148, 149, 165, 166, 167, 231, 232, 233, 249, 250, 251]
const occupiedCells = walls.concat(cage, powerPallets, emptyCells)
const dots = [] // contains numbers


function generateGrid() {
  grid.innerHTML = ''
  for (let i = 0; i < cellCount; i++) {
    const cell = document.createElement('DIV')
    cell.classList.add('cell')
    cell.style.width = `${100 / width}%` // 4.76%
    cell.style.height = `${100 / width}%`
    // cell.innerHTML = i
    cell.dataset.index = i
    grid.appendChild(cell)
    cells.push(cell)
    if (walls.includes(i)) {
      cell.classList.add('wall')
    }
    if (cage.includes(i)) {
      cell.classList.add('cage')
    }
    if (powerPallets.includes(i)) {
      cell.classList.add('power-pallet')
      const powerPalletUI = document.createElement('DIV')
      powerPalletUI.classList.add('power-pallet-ui')
      cell.appendChild(powerPalletUI)
    }
    if (!occupiedCells.includes(i)) {
      cell.classList.add('dots')
      const dotsUI = document.createElement('DIV')
      dotsUI.classList.add('dots-ui')
      cell.appendChild(dotsUI)
      dots.push(i)
    } 
  }
}

generateGrid()


// GENERATE DOTS AND POWER PALLETS TO PLAY AGAIN
function resetDotsAndPowerPallets() {
  for (let i = 0; i < cellCount; i++) {
    if (powerPallets.includes(i)) {
      cells[i].classList.add('power-pallet')
    }
    if (!occupiedCells.includes(i)) {
      cells[i].classList.add('dots')
    }
  } 
}



// GAME FUNCTIONALITY

// ELEMENTS

const startButton = document.querySelector('.start-button')
const livesElement = document.querySelector('.lives')
const scoreElement = document.querySelector('.score')

const overlayContainer = document.querySelector('.overlay-container')
const textOverlay = document.querySelector('.text-overlay')
const textOverlayWon = document.querySelector('.text-overlay-won')
const textOverlayWonSpan = document.querySelector('.text-overlay-won-span')
const textOverlayLost = document.querySelector('.text-overlay-lost')
const textOverlayLostSpan = document.querySelector('.text-overlay-lost-span')
const highscores = document.querySelector('.highscores')

// AUDIOS

const volumeOn = document.querySelector('.fa-solid')
const intro = document.querySelector('#audio-intro')
const soundPacmanDies = document.querySelector('#pacman-dies')
const soundDot = document.querySelector('#dot')
const soundGhostDies = document.querySelector('#ghost-dies')
const soundWin = document.querySelector('#player-wins')
const soundEndGame = document.querySelector('#end-game')


// VARIABLES

// PACMAN

const pacmanStartPosition = 325
let pacmanCurrentPosition = 325

const speedPacman = 300

let currentDirection
let nextDirection

let intervalMoveUp
let intervalMoveDown
let intervalMoveLeft
let intervalMoveRight

// GHOSTS

const ghostOneStartPosition = 157
let ghostOneCurrentPosition = 157

const ghostTwoStartPosition = 199
let ghostTwoCurrentPosition = 199

const ghostThreeStartPosition = 198
let ghostThreeCurrentPosition = 198

const ghostFourStartPosition = 200
let ghostFourCurrentPosition = 200

const speedGhost = 400

let intervalGhost1
let intervalGhost2
let intervalGhost3
let intervalGhost4

let position1Before
let position2Before
let position3Before
let position4Before

// SCORE AND LIVES

let lives
let score
let goal

const pointsDot = 1
const pointsPowerPallet = 50
const pointsGhost = 100

// TEXT OVERLAY

let intervalOverlay1
let intervalOverlay2
let intervalOverlay3
let intervalOverlay4

// HUNTING

let mode = 'normal'
let ghostOneDied = false
let ghostTwoDied = false
let ghostThreeDied = false
let ghostFourDied = false

let intervalResetHunting

// START GAME

const delayStartGame = 6000
let intervalGameStart

// PATH

const path = dots.concat(powerPallets) // path contains the number now

// SOUND

let sound



// FUNCTIONS

// SOUND ON

volumeUp()

function startGame() {

  // CLEAR TEXT OVERLAY 'READY'
  clearInterval(intervalOverlay1)
  clearInterval(intervalOverlay2)
  clearInterval(intervalOverlay3)
  clearInterval(intervalOverlay4)
  clearInterval(intervalGameStart)

  // TEXT OVERLAY 'READY'
  overlayContainer.style.display = 'block'
  textOverlay.innerHTML = '<h2>READY?</h2>'
  intervalOverlay1 = setTimeout(() => textOverlay.innerHTML = '<h2>3</h2>', delayStartGame * 0.25)
  intervalOverlay2 = setTimeout(() => textOverlay.innerHTML = '<h2>2</h2>', delayStartGame * 0.5)
  intervalOverlay3 = setTimeout(() => textOverlay.innerHTML = '<h2>1</h2>', delayStartGame * 0.75)
  intervalOverlay4 = setTimeout(() => overlayContainer.style.display = 'none', delayStartGame)
  textOverlay.style.display = 'flex'
  textOverlayLost.style.display = 'none'
  textOverlayWon.style.display = 'none'
  // highscores.style.display = 'none'

  // STOP PACMAN
  document.removeEventListener('keydown', movePacman)
  clearIntervalsPacmanMoving()

  // STOP GHOSTS FROM MOVING
  clearInterval(intervalGhost1)
  clearInterval(intervalGhost2)
  clearInterval(intervalGhost3)
  clearInterval(intervalGhost4)

  // DEFINE GHOST PREVIOUS POSITION
  position1Before = 178
  position2Before = 178
  position3Before = 178
  position4Before = 178

  // MUSIC STOPS FROM GAME BEFORE
  intro.pause()
  intro.currentTime = 0.1

  // AUDIO INTRO
  intro.playbackRate = 0.9
  intro.play()
  
  // setTimeout(() => {
  //   intro.pause()
  //   intro.currentTime = 0
  // }, delayStartGame - 600)
  

  // START GAME AFTER OVERLAY
  intervalGameStart = setTimeout(() => {
    resetDotsAndPowerPallets()
    resetGame()
    document.addEventListener('keydown', movePacman)
    moveGhostOne()
    moveGhostTwo()
    moveGhostThree()
    moveGhostFour()
    stopHunting()
  }, delayStartGame)
}

function resetGame() {
  // generateGrid()
  lives = 3
  livesElement.innerHTML = lives
  score = 0
  scoreElement.innerHTML = score
  goal = 1
  resetPacman()
  resetGhosts()
}

// PACMAN START POSITION
function resetPacman() {
  cells[pacmanCurrentPosition].classList.remove('pacman')
  pacmanCurrentPosition = pacmanStartPosition
  cells[pacmanStartPosition].classList.add('pacman')
  cells[pacmanCurrentPosition].classList.remove('dots')
}

// GIVE GHOSTS START POSITION
function resetGhosts() {
  // REMOVE GHOSTS FROM BOARD
  cells[ghostOneCurrentPosition].classList.remove('ghost-one', 'ghost-blue')
  cells[ghostTwoCurrentPosition].classList.remove('ghost-two', 'ghost-blue')
  cells[ghostThreeCurrentPosition].classList.remove('ghost-three', 'ghost-blue')
  cells[ghostFourCurrentPosition].classList.remove('ghost-four', 'ghost-blue')
  // RELOCATE GHOSTS TO START POSITION
  ghostOneCurrentPosition = ghostOneStartPosition
  ghostTwoCurrentPosition = ghostTwoStartPosition
  ghostThreeCurrentPosition = ghostThreeStartPosition
  ghostFourCurrentPosition = ghostFourStartPosition
  // ADD GHOSTS TO START POSITION
  cells[ghostOneStartPosition].classList.add('ghost-one')
  cells[ghostTwoStartPosition].classList.add('ghost-two')
  cells[ghostThreeStartPosition].classList.add('ghost-three')
  cells[ghostFourStartPosition].classList.add('ghost-four')
}



function movePacman(event) {
  const key = event.keyCode
  const up = 38
  const down = 40
  const left = 37
  const right = 39

  // PREVENTS HOLDING DOWN KEY
  if (event.repeat) {
    return
  }

  removePacman()


  


  // MOVE UP
  if (key === up && path.includes(pacmanCurrentPosition - width) && currentDirection !== 'up') {
    currentDirection = 'up'
    clearIntervalsPacmanMoving()
    pacmanCurrentPosition -= width
    addPacman()
      
    // KEEP MOVING UP
    intervalMoveUp = setInterval(function() {
      // GO NEXT POSSIBLE TO RIGHT
      if (nextDirection === 'right' && path.includes(pacmanCurrentPosition + 1)) {
        removePacman()
        currentDirection = 'right'
        clearInterval(intervalMoveUp)
        pacmanCurrentPosition++
        addPacman()
        intervalMoveRight = setInterval(function() {
          keepMovingRight()
        }, speedPacman)
      // GO NEXT POSSIBLE TO LEFT
      } else if (nextDirection === 'left' && path.includes(pacmanCurrentPosition - 1)) {
        removePacman()
        currentDirection = 'left'
        clearInterval(intervalMoveUp)
        pacmanCurrentPosition--
        addPacman()
        intervalMoveLeft = setInterval(function() {
          keepMovingLeft()
        }, speedPacman)
      }
      // KEEP MOVING UP
      keepMovingUp()
    }, speedPacman)
  }
  
  
  // MOVE DOWN
  if (key === down && path.includes(pacmanCurrentPosition + width) && currentDirection !== 'down') {
    currentDirection = 'down'
    clearIntervalsPacmanMoving()
    pacmanCurrentPosition += width
    addPacman()
  
    // KEEP MOVING DOWN
    intervalMoveDown = setInterval(function() {
      // GO NEXT POSSIBLE TO RIGHT
      if (nextDirection === 'right' && path.includes(pacmanCurrentPosition + 1)) {
        removePacman()
        currentDirection = 'right'
        clearInterval(intervalMoveDown)
        pacmanCurrentPosition++
        addPacman()
        intervalMoveRight = setInterval(function() {
          keepMovingRight()
        }, speedPacman)
      // GO NEXT POSSIBLE TO LEFT
      } else if (nextDirection === 'left' && path.includes(pacmanCurrentPosition - 1)) {
        removePacman()
        currentDirection = 'left'
        clearInterval(intervalMoveDown)
        pacmanCurrentPosition--
        addPacman()
        intervalMoveLeft = setInterval(function() {
          keepMovingLeft()
        }, speedPacman)
      }
      // KEEP MOVING DOWN
      keepMovingDown()
    }, speedPacman)
  }
  
  
  // MOVE LEFT
  if (key === left && path.includes(pacmanCurrentPosition - 1) && currentDirection !== 'left') {
    currentDirection = 'left'
    clearIntervalsPacmanMoving()
    pacmanCurrentPosition--
    addPacman()
  
    // KEEP MOVING LEFT
    intervalMoveLeft = setInterval(function() {
      // GO NEXT POSSIBLE UP
      if (nextDirection === 'up' && path.includes(pacmanCurrentPosition - width)) {
        removePacman()
        currentDirection = 'up'
        clearInterval(intervalMoveLeft)
        pacmanCurrentPosition -= width
        addPacman()
        intervalMoveUp = setInterval(function() {
          keepMovingUp()
        }, speedPacman)
      // GO NEXT POSSIBLE DOWN
      } else if (nextDirection === 'down' && path.includes(pacmanCurrentPosition + width)) {
        removePacman()
        currentDirection = 'down'
        clearInterval(intervalMoveLeft)
        pacmanCurrentPosition += width
        addPacman()
        intervalMoveDown = setInterval(function() {
          keepMovingDown()
        }, speedPacman)
      }
      // KEEP MOVING LEFT
      keepMovingLeft()
    }, speedPacman)
  }
  
  
  // MOVE RIGHT
  if (key === right && path.includes(pacmanCurrentPosition + 1) && currentDirection !== 'right') {
    currentDirection = 'right'
    clearIntervalsPacmanMoving()
    pacmanCurrentPosition++
    addPacman()
  
    // KEEP MOVING RIGHT
    intervalMoveRight = setInterval(function() {
      // GO NEXT POSSIBLE UP
      if (nextDirection === 'up' && path.includes(pacmanCurrentPosition - width)) {
        removePacman()
        currentDirection = 'up'
        clearInterval(intervalMoveRight)
        pacmanCurrentPosition -= width
        addPacman()
        intervalMoveUp = setInterval(function() {
          keepMovingUp()
        }, speedPacman)
      // GO NEXT POSSIBLE DOWN
      } else if (nextDirection === 'down' && path.includes(pacmanCurrentPosition + width)) {
        removePacman()
        currentDirection = 'down'
        clearInterval(intervalMoveRight)
        pacmanCurrentPosition += width
        addPacman()
        intervalMoveDown = setInterval(function() {
          keepMovingDown()
        }, speedPacman)
      }
      // KEEP MOVING RIGHT
      keepMovingRight()
    }, speedPacman)
  }
  
  addPacman()

  // TRY BETTER MOVEMENT

  if (key === up) {
    nextDirection = 'up'
  }
  if (key === down) {
    nextDirection = 'down'
  }
  if (key === left) {
    nextDirection = 'left'
  }
  if (key === right) {
    nextDirection = 'right'
  }
}


function keepMovingUp() {
  if (path.includes(pacmanCurrentPosition - width)) {
    removePacman()
    pacmanCurrentPosition -= width
    addPacman()
  }
}


function keepMovingDown() {
  if (path.includes(pacmanCurrentPosition + width)) {
    removePacman()
    pacmanCurrentPosition += width
    addPacman()
  }
}


function keepMovingLeft() {
  if (path.includes(pacmanCurrentPosition - 1)) {  
    removePacman()
    pacmanCurrentPosition --
    addPacman()
  }

  if (pacmanCurrentPosition === 189) {
    setTimeout(function() {
      removePacman()
      pacmanCurrentPosition = 209
      addPacman()
    }, speedPacman / 2)    
  }
}


function keepMovingRight() {
  if (path.includes(pacmanCurrentPosition + 1)) {
    removePacman()
    pacmanCurrentPosition++
    addPacman()
  }
  // GO THROUGH TUNNEL
  if (pacmanCurrentPosition === 209) {
    setTimeout(function() {
      removePacman()
      pacmanCurrentPosition = 189
      addPacman()
    }, speedPacman / 2)
  }
}


function removePacman() {
  cells[pacmanCurrentPosition].classList.remove('pacman', currentDirection)
}


function addPacman() {
  // PACMAN EATS DOT
  cells[pacmanCurrentPosition].classList.add('pacman', currentDirection)
  if (cells[pacmanCurrentPosition].classList.contains('dots')) {
    soundDot.play()
    updateScore(pointsDot)
    goal++
    cells[pacmanCurrentPosition].classList.remove('dots')
  }

  // PACMAN EATS POWER PALLET
  if (cells[pacmanCurrentPosition].classList.contains('power-pallet')) {
    updateScore(pointsPowerPallet)
    goal++
    cells[pacmanCurrentPosition].classList.remove('power-pallet')
    hunt()
    intervalResetHunting = setTimeout(stopHunting, 10000)
  }

  // PACMAN MEETS GHOST AND EATS OR DIES
  if (pacmanCurrentPosition === ghostOneCurrentPosition) {
    if (mode === 'hunting' && ghostOneDied === false) {
      ghostDies()
    } else {
      pacmanDies()
    }
  }
  if (pacmanCurrentPosition === ghostTwoCurrentPosition) {
    if (mode === 'hunting' && ghostTwoDied === false) {
      ghostDies()
    } else {
      pacmanDies()
    }
  }
  if (pacmanCurrentPosition === ghostThreeCurrentPosition) {
    if (mode === 'hunting' && ghostThreeDied === false) {
      ghostDies()
    } else {
      pacmanDies()
    }
  }
  if (pacmanCurrentPosition === ghostFourCurrentPosition) {
    if (mode === 'hunting' && ghostFourDied === false) {
      ghostDies()
    } else {
      pacmanDies()
    }
  }

  // PLAYER WINS WHEN GOAL REACHED
  if (goal === dots.length + powerPallets.length) {
    endGame()
  }
}


function clearIntervalsPacmanMoving() {
  clearInterval(intervalMoveUp)
  clearInterval(intervalMoveDown)
  clearInterval(intervalMoveLeft)
  clearInterval(intervalMoveRight)
}

function hunt() {
  mode = 'hunting'
  ghostOneDied = false
  ghostTwoDied = false
  ghostThreeDied = false
  ghostFourDied = false
  intro.playbackRate = 1.5
  clearInterval(intervalResetHunting)
}


function stopHunting() {
  mode = 'normal'
  ghostOneDied = false
  ghostTwoDied = false
  ghostThreeDied = false
  ghostFourDied = false
  intro.playbackRate = 0.9
}


function updateScore(points) {
  score += points
  scoreElement.innerHTML = score
}


// GHOST ONE

// GHOST UP DOWN RIGHT LEFT
function ghost1Up() {
  position1Before = ghostOneCurrentPosition
  ghostOneCurrentPosition = ghostOneCurrentPosition - width
}
function ghost1Down() {
  position1Before = ghostOneCurrentPosition
  ghostOneCurrentPosition = ghostOneCurrentPosition + width
}
function ghost1Right() {
  position1Before = ghostOneCurrentPosition
  ghostOneCurrentPosition = ghostOneCurrentPosition + 1
}
function ghost1Left() {
  position1Before = ghostOneCurrentPosition
  ghostOneCurrentPosition = ghostOneCurrentPosition - 1
}


// GHOST FOUR

// GHOST UP DOWN RIGHT LEFT
function ghost4Up() {
  position4Before = ghostFourCurrentPosition
  ghostFourCurrentPosition = ghostFourCurrentPosition - width
}
function ghost4Down() {
  position4Before = ghostFourCurrentPosition
  ghostFourCurrentPosition = ghostFourCurrentPosition + width
}
function ghost4Right() {
  position4Before = ghostFourCurrentPosition
  ghostFourCurrentPosition = ghostFourCurrentPosition + 1
}
function ghost4Left() {
  position4Before = ghostFourCurrentPosition
  ghostFourCurrentPosition = ghostFourCurrentPosition - 1
}


function moveGhostOne() {

  intervalGhost1 = setInterval(function() {

    // NOT GOING THROUGH TUNNEL
    if (ghostOneCurrentPosition === 209) {
      position1Before = 210
    }
    if (ghostOneCurrentPosition === 189) {
      position1Before = 188
    }

    cells[ghostOneCurrentPosition].classList.remove('ghost-one', 'ghost-blue')

    // RANDOM PATHFINDER
    // const directions = [ghostOneCurrentPosition - width, ghostOneCurrentPosition + width, ghostOneCurrentPosition - 1, ghostOneCurrentPosition + 1]
    // const possibleMovements = directions.filter(direction => path.includes(direction))
    // ghostOneCurrentPosition = possibleMovements[Math.floor(Math.random() * possibleMovements.length)]

    // SHORTEST ROUTE GHOST ONE
    const topToGhost = Math.floor(ghostOneCurrentPosition / width) + 1
    const leftToGhost = ghostOneCurrentPosition % width + 1
    const topToPacman = Math.floor(pacmanCurrentPosition / width) + 1
    const leftToPacman = pacmanCurrentPosition % width + 1
    const topDistance = Math.abs(topToGhost - topToPacman)
    const leftDistance = Math.abs(leftToGhost - leftToPacman)

    // GHOST AND PACMAN ON VERTICAL LINE, GHOST DOWN AND PACMAN UP
    if (leftToGhost === leftToPacman && topToGhost > topToPacman) {
      if (path.includes(ghostOneCurrentPosition - width)) {
        ghost1Up()
      } else if (path.includes(ghostOneCurrentPosition + 1) && position1Before !== ghostOneCurrentPosition + 1) {
        ghost1Right()
      } else if (path.includes(ghostOneCurrentPosition - 1) && position1Before !== ghostOneCurrentPosition - 1) {
        ghost1Left()
      } else {
        ghost1Down()
      }
    }
      
    // GHOST UP AND PACMAN DOWN
    if (leftToGhost === leftToPacman && topToGhost < topToPacman) {
      if (path.includes(ghostOneCurrentPosition + width)) {
        ghost1Down()
      } else if (path.includes(ghostOneCurrentPosition + 1) && position1Before !== ghostOneCurrentPosition + 1) {
        ghost1Right()
      } else if (path.includes(ghostOneCurrentPosition - 1) && position1Before !== ghostOneCurrentPosition - 1) {
        ghost1Left()
      } else {
        ghost1Up()
      }
    }

    // GHOST AND PACMAN ON HORIZONTAL LINE, GHOST LEFT AND PACMAN RIGHT
    if (topToGhost === topToPacman && leftToGhost < leftToPacman) {
      if (path.includes(ghostOneCurrentPosition + 1)) {
        ghost1Right()
      } else if (path.includes(ghostOneCurrentPosition - width) && position1Before !== ghostOneCurrentPosition - width) {
        ghost1Up()
      } else if (path.includes(ghostOneCurrentPosition + width) && position1Before !== ghostOneCurrentPosition + width) {
        ghost1Down()
      } else {
        ghost1Left()
      }
    }
      
    // GHOST RIGHT AND PACMAN LEFT 
    if (topToGhost === topToPacman && leftToGhost > leftToPacman) {
      if (path.includes(ghostOneCurrentPosition - 1)) {
        ghost1Left()
      } else if (path.includes(ghostOneCurrentPosition - width) && position1Before !== ghostOneCurrentPosition - width) {
        ghost1Up()
      } else if (path.includes(ghostOneCurrentPosition + width) && position1Before !== ghostOneCurrentPosition + width) {
        ghost1Down()
      } else {
        ghost1Right()
      }
    }

    // GHOST LEFT TOP AND PACMAN RIGHT BOTTOM
    if (leftToGhost < leftToPacman && topToGhost < topToPacman) {
      if (path.includes(ghostOneCurrentPosition + width) && position1Before !== ghostOneCurrentPosition + width) {
        ghost1Down()
      } else if (path.includes(ghostOneCurrentPosition + 1) && position1Before !== ghostOneCurrentPosition + 1) {
        ghost1Right()
      } else if (path.includes(ghostOneCurrentPosition - width) && position1Before !== ghostOneCurrentPosition - width) {
        ghost1Up()
      } else {
        ghost1Left()
      }
    }

    // GHOST RIGHT TOP AND PACMAN LEFT BOTTOM
    if (leftToGhost > leftToPacman && topToGhost < topToPacman) {
      if (path.includes(ghostOneCurrentPosition - 1) && position1Before !== ghostOneCurrentPosition - 1) {
        ghost1Left()
      } else if (path.includes(ghostOneCurrentPosition + width) && position1Before !== ghostOneCurrentPosition + width) {
        ghost1Down()
      } else if (path.includes(ghostOneCurrentPosition - width) && position1Before !== ghostOneCurrentPosition - width) {
        ghost1Up()
      } else {
        ghost1Right()
      }
    }

    // GHOST RIGHT BOTTOM AND PACMAN TOP LEFT
    if (leftToPacman < leftToGhost && topToPacman < topToGhost) {
      if (path.includes(ghostOneCurrentPosition - 1) && position1Before !== ghostOneCurrentPosition - 1) {
        ghost1Left()
      } else if (path.includes(ghostOneCurrentPosition - width) && position1Before !== ghostOneCurrentPosition - width) {
        ghost1Up()
      } else if (path.includes(ghostOneCurrentPosition + width) && position1Before !== ghostOneCurrentPosition + width) {
        ghost1Down()
      } else {
        ghost1Right()
      }
    }

    // GHOST LEFT BOTTOM AND PACMAN TOP RIGHT
    if (leftToPacman > leftToGhost && topToPacman < topToGhost) {
      if (path.includes(ghostOneCurrentPosition + 1) && position1Before !== ghostOneCurrentPosition + 1) {
        ghost1Right()
      } else if (path.includes(ghostOneCurrentPosition - width) && position1Before !== ghostOneCurrentPosition - width) {
        ghost1Up()
      } else if (path.includes(ghostOneCurrentPosition + width) && position1Before !== ghostOneCurrentPosition + width) {
        ghost1Down()
      } else {
        ghost1Left()
      }
    }

    // CHANGE COLOR DURING HUNT
    if (mode === 'hunting' && ghostOneDied === false) {
      cells[ghostOneCurrentPosition].classList.add('ghost-blue')
      // OTHERWISE NORMAL COLOR
    } else {
      cells[ghostOneCurrentPosition].classList.add('ghost-one')
    }

    // GHOST EATS OR DIES
    if (ghostOneCurrentPosition === pacmanCurrentPosition) {
      if (mode === 'hunting' && ghostOneDied === false) {
        ghostDies()
      } else {
        pacmanDies()
      }
    }
  }, speedGhost)
}


function moveGhostTwo() {
  setTimeout(function() {
    cells[ghostTwoCurrentPosition].classList.remove('ghost-two')
    ghostTwoCurrentPosition = 178
    cells[ghostTwoCurrentPosition].classList.add('ghost-two')
  }, speedGhost)
  setTimeout(function() {
    cells[ghostTwoCurrentPosition].classList.remove('ghost-two')
    ghostTwoCurrentPosition = 157
    cells[ghostTwoCurrentPosition].classList.add('ghost-two')
    intervalGhost2 = setInterval(function() {

      // NOT GOING THROUGH TUNNEL
      if (ghostTwoCurrentPosition === 209) {
        position2Before = 210
      }
      if (ghostTwoCurrentPosition === 189) {
        position2Before = 188
      }

      cells[ghostTwoCurrentPosition].classList.remove('ghost-two', 'ghost-blue')
      const directions = [ghostTwoCurrentPosition - width, ghostTwoCurrentPosition + width, ghostTwoCurrentPosition - 1, ghostTwoCurrentPosition + 1]
      const possibleMovements = directions.filter(direction => path.includes(direction) && direction !== position2Before)
      position2Before = ghostTwoCurrentPosition
      ghostTwoCurrentPosition = possibleMovements[Math.floor(Math.random() * possibleMovements.length)]

      // CHANGE COLOR DURING HUNT
      if (mode === 'hunting' && ghostTwoDied === false) {
        cells[ghostTwoCurrentPosition].classList.add('ghost-blue')
        // OTHERWISE NORMAL COLOR
      } else {
        cells[ghostTwoCurrentPosition].classList.add('ghost-two')
      }

      // GHOST EATS OR DIES
      if (ghostTwoCurrentPosition === pacmanCurrentPosition) {
        if (mode === 'hunting' && ghostTwoDied === false) {
          ghostDies()
        } else {
          pacmanDies()
        }
      }

      
    }, speedGhost)
  }, speedGhost * 2)
}

function moveGhostThree() {
  setTimeout(function() {
    cells[ghostThreeCurrentPosition].classList.remove('ghost-three')
    ghostThreeCurrentPosition = 199
    cells[ghostThreeCurrentPosition].classList.add('ghost-three')
  }, speedGhost)
  setTimeout(function() {
    cells[ghostThreeCurrentPosition].classList.remove('ghost-three')
    ghostThreeCurrentPosition = 178
    cells[ghostThreeCurrentPosition].classList.add('ghost-three')
  }, speedGhost * 2)
  setTimeout(function() {
    cells[ghostThreeCurrentPosition].classList.remove('ghost-three')
    ghostThreeCurrentPosition = 157
    cells[ghostThreeCurrentPosition].classList.add('ghost-three')
    intervalGhost3 = setInterval(function() {

      // NOT GOING THROUGH TUNNEL
      if (ghostThreeCurrentPosition === 209) {
        position3Before = 210
      }
      if (ghostThreeCurrentPosition === 189) {
        position3Before = 188
      }

      cells[ghostThreeCurrentPosition].classList.remove('ghost-three', 'ghost-blue')
      const directions = [ghostThreeCurrentPosition - width, ghostThreeCurrentPosition + width, ghostThreeCurrentPosition - 1, ghostThreeCurrentPosition + 1]
      const possibleMovements = directions.filter(direction => path.includes(direction) && direction !== position3Before)
      position3Before = ghostThreeCurrentPosition
      ghostThreeCurrentPosition = possibleMovements[Math.floor(Math.random() * possibleMovements.length)]

      // CHANGE COLOR DURING HUNT
      if (mode === 'hunting' && ghostThreeDied === false) {
        cells[ghostThreeCurrentPosition].classList.add('ghost-blue')
        // OTHERWISE NORMAL COLOR
      } else {
        cells[ghostThreeCurrentPosition].classList.add('ghost-three')
      }
      
      // GHOST EATS OR DIES
      if (ghostThreeCurrentPosition === pacmanCurrentPosition) {
        if (mode === 'hunting' && ghostThreeDied === false) {
          ghostDies()
        } else {
          pacmanDies()
        }
      }

    }, speedGhost)
  }, speedGhost * 3)
}

function moveGhostFour() {
  setTimeout(function() {
    cells[ghostFourCurrentPosition].classList.remove('ghost-four')
    ghostFourCurrentPosition = 199
    cells[ghostFourCurrentPosition].classList.add('ghost-four')
  }, speedGhost * 2)
  setTimeout(function() {
    cells[ghostFourCurrentPosition].classList.remove('ghost-four')
    ghostFourCurrentPosition = 178
    cells[ghostFourCurrentPosition].classList.add('ghost-four')
  }, speedGhost * 3)
  setTimeout(function() {
    cells[ghostFourCurrentPosition].classList.remove('ghost-four')
    ghostFourCurrentPosition = 157
    cells[ghostFourCurrentPosition].classList.add('ghost-four')
    intervalGhost4 = setInterval(function() {

      // NOT GOING THROUGH TUNNEL
      if (ghostFourCurrentPosition === 209) {
        position4Before = 210
      }
      if (ghostFourCurrentPosition === 189) {
        position4Before = 188
      }

      cells[ghostFourCurrentPosition].classList.remove('ghost-four', 'ghost-blue')
      
      // const directions = [ghostFourCurrentPosition - width, ghostFourCurrentPosition + width, ghostFourCurrentPosition - 1, ghostFourCurrentPosition + 1]
      // const possibleMovements = directions.filter(direction => path.includes(direction))
      // ghostFourCurrentPosition = possibleMovements[Math.floor(Math.random() * possibleMovements.length)]

      // SHORTEST ROUTE GHOST FOuR
      const topToGhost4 = Math.floor(ghostFourCurrentPosition / width) + 1
      const leftToGhost4 = ghostFourCurrentPosition % width + 1
      const topToPacman = Math.floor(pacmanCurrentPosition / width) + 1
      const leftToPacman = pacmanCurrentPosition % width + 1
      const topDistance = Math.abs(topToGhost4 - topToPacman)
      const leftDistance = Math.abs(leftToGhost4 - leftToPacman)

      // GHOST AND PACMAN ON VERTICAL LINE, GHOST DOWN AND PACMAN UP
      if (leftToGhost4 === leftToPacman && topToGhost4 > topToPacman) {
        if (path.includes(ghostFourCurrentPosition - width)) {
          ghost4Up()
        } else if (path.includes(ghostFourCurrentPosition - 1) && position4Before !== ghostFourCurrentPosition - 1) {
          ghost4Left()
        } else if (path.includes(ghostFourCurrentPosition + 1) && position4Before !== ghostFourCurrentPosition + 1) {
          ghost4Right()
        } else {
          ghost4Down()
        }
      }
        
      // GHOST UP AND PACMAN DOWN
      if (leftToGhost4 === leftToPacman && topToGhost4 < topToPacman) {
        if (path.includes(ghostFourCurrentPosition + width)) {
          ghost4Down()
        } else if (path.includes(ghostFourCurrentPosition - 1) && position4Before !== ghostFourCurrentPosition - 1) {
          ghost4Left()
        } else if (path.includes(ghostFourCurrentPosition + 1) && position4Before !== ghostFourCurrentPosition + 1) {
          ghost4Right()
        } else {
          ghost4Up()
        }
      }

      // GHOST AND PACMAN ON HORIZONTAL LINE, GHOST LEFT AND PACMAN RIGHT
      if (topToGhost4 === topToPacman && leftToGhost4 < leftToPacman) {
        if (path.includes(ghostFourCurrentPosition + 1)) {
          ghost4Right()
        } else if (path.includes(ghostFourCurrentPosition + width) && position4Before !== ghostFourCurrentPosition + width) {
          ghost4Down()
        } else if (path.includes(ghostFourCurrentPosition - width) && position4Before !== ghostFourCurrentPosition - width) {
          ghost4Up()
        } else {
          ghost4Left()
        }
      }
        
      // GHOST RIGHT AND PACMAN LEFT 
      if (topToGhost4 === topToPacman && leftToGhost4 > leftToPacman) {
        if (path.includes(ghostFourCurrentPosition - 1)) {
          ghost4Left()
        } else if (path.includes(ghostFourCurrentPosition + width) && position4Before !== ghostFourCurrentPosition + width) {
          ghost4Down()
        } else if (path.includes(ghostFourCurrentPosition - width) && position4Before !== ghostFourCurrentPosition - width) {
          ghost4Up()
        } else {
          ghost4Right()
        }
      }

      // GHOST LEFT TOP AND PACMAN RIGHT BOTTOM
      if (leftToGhost4 < leftToPacman && topToGhost4 < topToPacman) {
        if (path.includes(ghostFourCurrentPosition + 1) && position4Before !== ghostFourCurrentPosition + 1) {
          ghost4Right()
        } else if (path.includes(ghostFourCurrentPosition + width) && position4Before !== ghostFourCurrentPosition + width) {
          ghost4Down()
        } else if (path.includes(ghostFourCurrentPosition - width) && position4Before !== ghostFourCurrentPosition - width) {
          ghost4Up()
        } else {
          ghost4Left()
        }
      }

      // GHOST RIGHT TOP AND PACMAN LEFT BOTTOM
      if (leftToGhost4 > leftToPacman && topToGhost4 < topToPacman) {
        if (path.includes(ghostFourCurrentPosition + width) && position4Before !== ghostFourCurrentPosition + width) {
          ghost4Down()
        } else if (path.includes(ghostFourCurrentPosition - 1) && position4Before !== ghostFourCurrentPosition - 1) {
          ghost4Left()
        } else if (path.includes(ghostFourCurrentPosition - width) && position4Before !== ghostFourCurrentPosition - width) {
          ghost4Up()
        } else {
          ghost4Right()
        }
      }

      // GHOST RIGHT BOTTOM AND PACMAN TOP LEFT
      if (leftToPacman < leftToGhost4 && topToPacman < topToGhost4) {
        if (path.includes(ghostFourCurrentPosition - width) && position4Before !== ghostFourCurrentPosition - width) {
          ghost4Up()
        } else if (path.includes(ghostFourCurrentPosition - 1) && position4Before !== ghostFourCurrentPosition - 1) {
          ghost4Left()
        } else if (path.includes(ghostFourCurrentPosition + width) && position4Before !== ghostFourCurrentPosition + width) {
          ghost4Down()
        } else {
          ghost4Right()
        }
      }

      // GHOST LEFT BOTTOM AND PACMAN TOP RIGHT
      if (leftToPacman > leftToGhost4 && topToPacman < topToGhost4) {
        if (path.includes(ghostFourCurrentPosition - width) && position4Before !== ghostFourCurrentPosition - width) {
          ghost4Up()
        } else if (path.includes(ghostFourCurrentPosition + 1) && position4Before !== ghostFourCurrentPosition + 1) {
          ghost4Right()
        } else if (path.includes(ghostFourCurrentPosition + width) && position4Before !== ghostFourCurrentPosition + width) {
          ghost4Down()
        } else {
          ghost4Left()
        }
      }

      // CHANGE COLOR DURING HUNT
      if (mode === 'hunting' && ghostFourDied === false) {
        cells[ghostFourCurrentPosition].classList.add('ghost-blue')
        // OTHERWISE NORMAL COLOR
      } else {
        cells[ghostFourCurrentPosition].classList.add('ghost-four')
      }
      
      // GHOST EATS OR DIES
      if (ghostFourCurrentPosition === pacmanCurrentPosition) {
        if (mode === 'hunting' && ghostFourDied === false) {
          ghostDies()
        } else {
          pacmanDies()
        }
      }

    }, speedGhost)
  }, speedGhost * 4)
}



function pacmanDies() {
  lives--
  livesElement.innerHTML = lives

  soundPacmanDies.play()

  // STOP PACMAN
  clearInterval(intervalMoveUp)
  clearInterval(intervalMoveDown)
  clearInterval(intervalMoveLeft)
  clearInterval(intervalMoveRight)

  removePacman()
  pacmanCurrentPosition = pacmanStartPosition
  currentDirection = 'none'

  if (lives === 0) {
    endGame()
  } else {
    addPacman()
  }
}


// GHOSTS GO BACK TO START POSITION
function ghostDies() {
  updateScore(pointsGhost)
  soundGhostDies.play()

  // GHOST ONE
  if (pacmanCurrentPosition === ghostOneCurrentPosition) {
    clearInterval(intervalGhost1)
    cells[ghostOneCurrentPosition].classList.remove('ghost-blue')
    ghostOneCurrentPosition = ghostOneStartPosition
    cells[ghostOneStartPosition].classList.add('ghost-one')
    ghostOneDied = true
    setTimeout(moveGhostOne, 4000)
  }

  // GHOST TWO
  if (pacmanCurrentPosition === ghostTwoCurrentPosition) {
    clearInterval(intervalGhost2)
    cells[ghostTwoCurrentPosition].classList.remove('ghost-blue')
    ghostTwoCurrentPosition = ghostTwoStartPosition
    cells[ghostTwoStartPosition].classList.add('ghost-two')
    ghostTwoDied = true
    setTimeout(moveGhostTwo, 4000)
  }

  // GHOST THREE
  if (pacmanCurrentPosition === ghostThreeCurrentPosition) {
    clearInterval(intervalGhost3)
    cells[ghostThreeCurrentPosition].classList.remove('ghost-blue')
    ghostThreeCurrentPosition = ghostThreeStartPosition
    cells[ghostThreeStartPosition].classList.add('ghost-three')
    ghostThreeDied = true
    setTimeout(moveGhostThree, 4000)
  }

  // GHOST FOUR
  if (pacmanCurrentPosition === ghostFourCurrentPosition) {
    clearInterval(intervalGhost4)
    cells[ghostFourCurrentPosition].classList.remove('ghost-blue')
    ghostFourCurrentPosition = ghostFourStartPosition
    cells[ghostFourStartPosition].classList.add('ghost-four')
    ghostFourDied = true
    setTimeout(moveGhostFour, 4000)
  }
}


function endGame() {

  // STOP PACMAN
  document.removeEventListener('keydown', movePacman)

  // STOP GHOSTS MOVING
  clearInterval(intervalGhost1)
  clearInterval(intervalGhost2)
  clearInterval(intervalGhost3)
  clearInterval(intervalGhost4)

  // MUSIC STOPS
  intro.pause()
  intro.currentTime = 0

  

  // SHOW SCORE WITH TEXTOVERLAY
  setTimeout(function() {
    overlayContainer.style.display = 'block'
    textOverlay.style.display = 'none'
    if (lives === 0) {
      
      setTimeout(function() {
        soundEndGame.play()
      }, 350)
      textOverlayLost.style.display = 'flex'
      textOverlayLostSpan.innerHTML = score
    } else {
      soundWin.play()
      textOverlayWon.style.display = 'flex'
      textOverlayWonSpan.innerHTML = score 
    }
  }, speedPacman)

  // setTimeout(() => {
  //   textOverlayLost.style.display = 'none'
  //   textOverlayWon.style.display = 'none'
  //   highscores.style.display = 'flex'
  // }, 3000)
  
}

function turnVolumeOn() {
  if (sound === 'on') {
    volumeDown()
  } else {
    volumeUp()
  }

  
}

function volumeUp() {
  intro.volume = 0.05
  soundDot.volume = 0.05
  soundPacmanDies.volume = 0.2
  soundGhostDies.volume = 0.05
  soundWin.volume = 0.1
  soundEndGame.volume = 0.05
  sound = 'on'
  volumeOn.classList.remove('fa-volume-xmark')
  volumeOn.classList.add('fa-volume-high')
  volumeOn.style.paddingRight = '0px'
}

function volumeDown() {
  intro.volume = 0
  soundDot.volume = 0
  soundPacmanDies.volume = 0
  soundGhostDies.volume = 0
  soundWin.volume = 0
  soundEndGame.volume = 0
  sound = 'off'
  volumeOn.classList.remove('fa-volume-high')
  volumeOn.classList.add('fa-volume-xmark')
  volumeOn.style.paddingRight = '2px'
}



// EVENTS

startButton.addEventListener('click', startGame)
volumeOn.addEventListener('click', turnVolumeOn)