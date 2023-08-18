## PACMAN

Pac Man is a classic arcade game from the 80s. The player aims to eat all the food in a maze whilst being hunted by ghosts.

If the player eats special flashing food the ghosts turn blue and can now be captured by the player, sending them back to their holding pen, from where they can once again start to hunt the player.

The aim is to achieve the highest score possible before being killed by the ghosts.


## GAMES'S LINK

https://nadjaob.github.io/pacman/


## PROJECT

This was a solo project which had to be planned, designed, built and tested within one week.


## TECHNOLOGIES USED

### HTML

- Semantic HTML structure
- Text logo
- Button to start game
- Text overlay for countdown and score display
- Audio elements for background music and sound effects
- Volume icons to turn music on and off


### CSS

- Simple retro-design in yellow, black and white
- Monospace font for easier designing of curved text logo
- Positioning of elements using flex-box
- Consistent design throughout the whole game for instance using same box shadow for button, main content and text overlay
- Different background images for characters depending on the mode of the game
- Rotation of pacman depending on direction it takes


### JAVASCRIPT

- Dynamic grid creation based on 21 x 21 cells
- Clickevent to start and reset game anytime
- Clickevent to turn on and off the sound
- Keyup event to move pacman in four directions and set interval to keep moving in the same direction until it hits a wall
- Two ghosts always find a path to move towards pacman
- Two ghosts are moving randomly
- Extra feature which allows pacman but not ghosts to go through tunnel
- Hunting mode which allows pacman to eat ghosts
- Automatic scores and lives update which displays on the screen
- Hide and show overlays


### EXCALIDRAW

- wireframes creation for game layout and different text overlays with countdown before game starts and view score after game ends


## THE APPROACH TAKEN


### DAY 1
- created detailed wireframe
- got familiar with rules and functions
- wrote pseudo code with all mandatory features
- added list and prioritization of stretch goals to pseudo code
- started building html structure
- research for design ideas


### DAY 2
- started implementing css
- created automatic generated grid and added walls, cage, dots and powerpallets
- added images of characters
- defined start positions of characters
- added keydown event listener to make pacman move in four directions
- improved pacman's movements: made him keep moving with an interval once a direction is taking until he hits a wall
- bug: overlaping intervals when more than one keys are pressed quickly, cant control pacman anymore
  solution: cleared all previous intervals from movements
- bug: if same key is pressed quickly many times or held down then pacman will move quicker than it should
  solution: defined global variables for each direction and only allow to press a key again when its not pressed already


### DAY 3
- added random ghosts movement
- bug: sometimes ghost moves one step back and forward many times
  solution: ghost is not allowed to go back to his previous position
- bug: ghosts disappeared when arriving at the end of the tunnel because they didn't have an option to move
  solution: defined that as soon as ghost arrives at the end of the tunnel it is allowed to go back to its previous position 
- added score counting and defined values for different achievements


### DAY 4
- added hunting mode when pacman eats power pallet, ghosts start flashing blue
- defined that ghosts can eat pacman and pacman can eat ghosts during hunting mode and the characters are moved to their start position
- defined end of game when player doesn't have any lives left or all dots have been eaten
- all intervals are cleared and the keydown event is removed so the board freezes


### DAY 5
- added textoverlay with countdown when user clicks 'PLAY'
- added textoverlay with WON or LOST message and achieved score
- added first stretch goal: added background music when game starts and sound effects


### DAY 6
- added second stretch goal: added advanced pathfinder for two ghosts so they will always find a path towards pacman



### WHEN THE PAGE LOADS
- the user can see the logo, start button, volume button, the maze without characters yet, his lives and the score starting from 0


## WHEN THE GAME STARTS
- a pop-up appears asking 'Ready?' and counting down from 3, background music starts playing
- as soon as the pop-up disappears the characters appear on the maze
- the ghosts start to move after each other with the same speed and leave their cage
- two of the ghosts move randomly and two find their way towards pacman
- the user can now navigate pacman along the path and collet dots and power pallets


## WHEN THE GHOASTS MOVE
- before making a step the two randomly moving ghosts check where there is a path around them, then they will get a random number to decide which way to take
- they keep moving forward and can never go back a step
- the two advanced ghosts check their own position in relation to pacman's position before every step
- then they check if the movement towards pacman's position is on the path so they can decide for the best movement to chase pacman
- they also usually keep moving forward without turning around
- the only time a ghost can turn around is if the ghost and pacman are on the same horizontal or vertical level



## WHEN PACMAN MOVES
- keyup event is used
- pacman can only move along the path
- when the player presses a key pacman will keep moving until it hits a wall or if another key is pressed it will take the first possible turn into this direction
- the player can never move pacman quicker than the set interval
- pacman can be eaten by ghosts when they have the same position
- after eating a power pallet the hunt mode will start and pacman is now able to eat a ghost
- every dot, power pallet and ghost eaten will add up to the score
- the player wins when all dots and power pallets have been eaten




## KEY LEARNINGS AND CHALLENGES
- defining global variables to implement different conditions into the game (eg to set hunting mode, to check current direction)
- using intervals to make character keep moving, taking the next possible turn when player sets a new direction and keep moving into the new direction
- understanding the positions of two characters in a grid and using if-statements to follow a path towards the other character
- implementing text overlays using javascript
- using rotations in css to define curved words
- using roations to change background images depending on current direction of pacman


## BUGS

The game works smoothly and there are no obvious bugs.

Still there is room for optimization like:
- The paths of the ghosts sometimes overlap so one ghost seems to disappear until they both separate their paths again
- With the right timing of the player pacman can go quick around corners which makes it faster than it is supposed to be


## IDEAS FOR FURTHER IMPLEMENTATIONS

- Recurring appearing fruits for extra score points
- Each ghost moving in its own area or having its own algorithm
- Responsive design
- Persistend leaderboard
- Increasing difficulty throuout the levels
