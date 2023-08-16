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

const intro = document.querySelector('#audio-intro')


// VARIABLES

// PACMAN

const pacmanStartPosition = 325
let pacmanCurrentPosition = 325

const speedPacman = 300

let currentDirection

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

const speedGhost = 300

let intervalGhost1
let intervalGhost2
let intervalGhost3
let intervalGhost4

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

// START GAME

const delayStartGame = 6000
let intervalGameStart

// PATH

const path = dots.concat(powerPallets) // path contains the number now



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

  // STOP PACMAN
  document.removeEventListener('keydown', movePacman)

  // STOP GHOSTS FROM MOVING
  clearInterval(intervalGhost1)
  clearInterval(intervalGhost2)
  clearInterval(intervalGhost3)
  clearInterval(intervalGhost4)

  // MUSIC STOPS FROM GAME BEFORE
  intro.pause()
  intro.currentTime = 0

  // AUDIO INTRO
  intro.play()
  // setTimeout(() => {
  //   intro.pause()
  //   intro.currentTime = 0
  // }, delayStartGame - 600)
  intro.volume = 0.1

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
      if (path.includes(pacmanCurrentPosition - width)) {
        removePacman()
        pacmanCurrentPosition -= width
        addPacman()
      }
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
      if (path.includes(pacmanCurrentPosition + width)) {
        removePacman()
        pacmanCurrentPosition += width
        addPacman()
      }
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
      if (path.includes(pacmanCurrentPosition - 1)) {  
        removePacman()
        pacmanCurrentPosition --
        addPacman()
      }
  
      if (pacmanCurrentPosition === 189) {
        removePacman()
        pacmanCurrentPosition = 209
        addPacman()
      }
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
      if (path.includes(pacmanCurrentPosition + 1)) {
        removePacman()
        pacmanCurrentPosition++
        addPacman()
      }
  
      if (pacmanCurrentPosition === 209) {
        removePacman()
        pacmanCurrentPosition = 189
        addPacman()
      }
    }, speedPacman)
  }
  
  addPacman()
}


function removePacman() {
  cells[pacmanCurrentPosition].classList.remove('pacman', currentDirection)
}


function addPacman() {
  // PACMAN EATS DOT
  cells[pacmanCurrentPosition].classList.add('pacman', currentDirection)
  if (cells[pacmanCurrentPosition].classList.contains('dots')) {
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
    setTimeout(stopHunting, 8000)
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
}


function stopHunting() {
  mode = 'normal'
  ghostOneDied = false
  ghostTwoDied = false
  ghostThreeDied = false
  ghostFourDied = false
}


function updateScore(points) {
  score += points
  scoreElement.innerHTML = score
}


function moveGhostOne() {

  intervalGhost1 = setInterval(function() {
    cells[ghostOneCurrentPosition].classList.remove('ghost-one', 'ghost-blue')
    const directions = [ghostOneCurrentPosition - width, ghostOneCurrentPosition + width, ghostOneCurrentPosition - 1, ghostOneCurrentPosition + 1]
    const possibleMovements = directions.filter(direction => path.includes(direction))
    ghostOneCurrentPosition = possibleMovements[Math.floor(Math.random() * possibleMovements.length)]

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
      cells[ghostTwoCurrentPosition].classList.remove('ghost-two', 'ghost-blue')
      const directions = [ghostTwoCurrentPosition - width, ghostTwoCurrentPosition + width, ghostTwoCurrentPosition - 1, ghostTwoCurrentPosition + 1]
      const possibleMovements = directions.filter(direction => path.includes(direction))
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
      cells[ghostThreeCurrentPosition].classList.remove('ghost-three', 'ghost-blue')
      const directions = [ghostThreeCurrentPosition - width, ghostThreeCurrentPosition + width, ghostThreeCurrentPosition - 1, ghostThreeCurrentPosition + 1]
      const possibleMovements = directions.filter(direction => path.includes(direction))
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
      cells[ghostFourCurrentPosition].classList.remove('ghost-four', 'ghost-blue')
      const directions = [ghostFourCurrentPosition - width, ghostFourCurrentPosition + width, ghostFourCurrentPosition - 1, ghostFourCurrentPosition + 1]
      const possibleMovements = directions.filter(direction => path.includes(direction))
      ghostFourCurrentPosition = possibleMovements[Math.floor(Math.random() * possibleMovements.length)]

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

  // GHOST ONE
  if (pacmanCurrentPosition === ghostOneCurrentPosition) {
    clearInterval(intervalGhost1)
    cells[ghostOneCurrentPosition].classList.remove('ghost-blue')
    ghostOneCurrentPosition = ghostOneStartPosition
    cells[ghostOneStartPosition].classList.add('ghost-one')
    ghostOneDied = true
    moveGhostOne()
  }

  // GHOST TWO
  if (pacmanCurrentPosition === ghostTwoCurrentPosition) {
    clearInterval(intervalGhost2)
    cells[ghostTwoCurrentPosition].classList.remove('ghost-blue')
    ghostTwoCurrentPosition = ghostTwoStartPosition
    cells[ghostTwoStartPosition].classList.add('ghost-two')
    ghostTwoDied = true
    moveGhostTwo()
  }

  // GHOST THREE
  if (pacmanCurrentPosition === ghostThreeCurrentPosition) {
    clearInterval(intervalGhost3)
    cells[ghostThreeCurrentPosition].classList.remove('ghost-blue')
    ghostThreeCurrentPosition = ghostThreeStartPosition
    cells[ghostThreeStartPosition].classList.add('ghost-three')
    ghostThreeDied = true
    moveGhostThree()
  }

  // GHOST FOUR
  if (pacmanCurrentPosition === ghostFourCurrentPosition) {
    clearInterval(intervalGhost4)
    cells[ghostFourCurrentPosition].classList.remove('ghost-blue')
    ghostFourCurrentPosition = ghostFourStartPosition
    cells[ghostFourStartPosition].classList.add('ghost-four')
    ghostFourDied = true
    moveGhostFour()
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
    if (lives === 0) {
      textOverlay.innerHTML = `<h2>GAME OVER!<br>SCORE: ${score}</h2>`
    } else {
      textOverlay.innerHTML = `<h2>YOU WON!<br>SCORE: ${score}</h2>` 
    }
  }, speedPacman)
  
}


// EVENTS

startButton.addEventListener('click', startGame)