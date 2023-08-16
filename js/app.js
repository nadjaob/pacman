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

let lives = 3
let score = 0
let goal = 1

const pointsDot = 1
const pointsPowerPallet = 50
const pointsGhost = 100

// START GAME

const delayStartGame = 6000

// PATH

const path = dots.concat(powerPallets) // path contains the number now



function startGame() {

  // TEXT OVERLAY 'READY'
  overlayContainer.style.display = 'block'
  textOverlay.innerHTML = '<h2>READY?</h2>'
  setTimeout(() => textOverlay.innerHTML = '<h2>3</h2>', delayStartGame * 0.25)
  setTimeout(() => textOverlay.innerHTML = '<h2>2</h2>', delayStartGame * 0.5)
  setTimeout(() => textOverlay.innerHTML = '<h2>1</h2>', delayStartGame * 0.75)
  setTimeout(() => overlayContainer.style.display = 'none', delayStartGame)

  // START GAME AFTER OVERLAY
  setTimeout(() => {
    resetDotsAndPowerPallets()
    resetGame()
    document.addEventListener('keydown', movePacman)
    moveGhostOne()
    moveGhostTwo()
    moveGhostThree()
    moveGhostFour()
  }, delayStartGame)
}

function resetGame() {
  // generateGrid()
  lives = 3
  livesElement.innerHTML = lives
  score = 0
  scoreElement.innerHTML = score
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
  // // REMOVE GHOSTS FROM BOARD
  // cells[ghostOneCurrentPosition].classList.remove('ghost-one')
  // cells[ghostTwoCurrentPosition].classList.remove('ghost-two')
  // cells[ghostThreeCurrentPosition].classList.remove('ghost-three')
  // cells[ghostFourCurrentPosition].classList.remove('ghost-four')
  // // RELOCATE GHOSTS TO START POSITION
  // ghostOneCurrentPosition = ghostOneStartPosition
  // ghostTwoCurrentPosition = ghostTwoStartPosition
  // ghostThreeCurrentPosition = ghostThreeStartPosition
  // ghostFourCurrentPosition = ghostFourStartPosition
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
      console.log('moving right')
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
    // hunt()
    // setTimeout(stopHunting, 20000)
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


function updateScore(points) {
  score += points
  scoreElement.innerHTML = score
}


function moveGhostOne() {

  intervalGhost1 = setInterval(function() {
    cells[ghostOneCurrentPosition].classList.remove('ghost-one')
    // cells[ghostTwoCurrentPosition].classList.remove('ghost-blue')
    const directions = [ghostOneCurrentPosition - width, ghostOneCurrentPosition + width, ghostOneCurrentPosition - 1, ghostOneCurrentPosition + 1]
    const possibleMovements = directions.filter(direction => path.includes(direction))
    ghostOneCurrentPosition = possibleMovements[Math.floor(Math.random() * possibleMovements.length)]

    cells[ghostOneCurrentPosition].classList.add('ghost-one')


      
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
      cells[ghostTwoCurrentPosition].classList.remove('ghost-two')
      // cells[ghostTwoCurrentPosition].classList.remove('ghost-blue')
      const directions = [ghostTwoCurrentPosition - width, ghostTwoCurrentPosition + width, ghostTwoCurrentPosition - 1, ghostTwoCurrentPosition + 1]
      const possibleMovements = directions.filter(direction => path.includes(direction))
      ghostTwoCurrentPosition = possibleMovements[Math.floor(Math.random() * possibleMovements.length)]

      cells[ghostTwoCurrentPosition].classList.add('ghost-two')

      
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
      cells[ghostThreeCurrentPosition].classList.remove('ghost-three')
      // cells[ghostThreeCurrentPosition].classList.remove('ghost-blue')
      const directions = [ghostThreeCurrentPosition - width, ghostThreeCurrentPosition + width, ghostThreeCurrentPosition - 1, ghostThreeCurrentPosition + 1]
      const possibleMovements = directions.filter(direction => path.includes(direction))
      ghostThreeCurrentPosition = possibleMovements[Math.floor(Math.random() * possibleMovements.length)]

      cells[ghostThreeCurrentPosition].classList.add('ghost-three')
      


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
      cells[ghostFourCurrentPosition].classList.remove('ghost-four')
      // cells[ghostFourCurrentPosition].classList.remove('ghost-blue')
      const directions = [ghostFourCurrentPosition - width, ghostFourCurrentPosition + width, ghostFourCurrentPosition - 1, ghostFourCurrentPosition + 1]
      const possibleMovements = directions.filter(direction => path.includes(direction))
      ghostFourCurrentPosition = possibleMovements[Math.floor(Math.random() * possibleMovements.length)]

      cells[ghostFourCurrentPosition].classList.add('ghost-four')
      
      

    }, speedGhost)
  }, speedGhost * 4)
}



function endGame() {

}


// EVENTS

startButton.addEventListener('click', startGame)