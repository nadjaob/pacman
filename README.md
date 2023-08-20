## PACMAN

Pac Man is a classic arcade game from the 80s. The player aims to eat all the food in a maze whilst being hunted by ghosts.

If the player eats special flashing food the ghosts start to flash and can now be captured by the player, sending them back to their holding pen, from where they can once again start to hunt the player.

The aim is to achieve the highest score possible before being killed by the ghosts.


## LINK TO THE GAME

https://nadjaob.github.io/pacman/


## PROJECT

This was a solo project which was planned, designed and built within one week. It's a unique version of pacman based on a 21x21 grid using JavaScript, HTML and CSS.


## TECHNOLOGIES USED

### HTML

- Header section with text logo
- 3D button to start game
- Text overlay for countdown and score display
- Audio elements for background music and sound effects
- Volume icons to turn music on and off


### CSS

- Monospace font for easier designing of curved text logo
- Positioning of elements using flex-box
- Clean and consistent design throughout the whole game using box-shadow
- Different background images for characters depending on the mode of the game
- Rotation of pacman depending on direction


### JAVASCRIPT

- Dynamic grid creation
- Clickevent to start and reset game anytime
- Clickevent to turn on and off the sound
- setInterval to make characters keep moving in same direction
- Different random and advanced pathfinder for ghosts
- Hunting mode to change conditions of game
- Display pop-ups


## THE APPROACH TAKEN


### DAY 1

I initially created a basic wireframe using Excalidraw, laying out the grid and designing the maze of my pacman game including two textoverlays before and after the game. The wireframe is fairly simple and straight-forward, including the least necessary elements to play the game.

![Alt text](README-files/image.png)

In addition to the wireframe I planned the whole game in an extensive pseudocode adding all mandatory features and a list of stretch goals. This pseudoocde also guided me through the project and helped me with my time management.

On the same day I built the HTML structure and did some research for design ideas.


### DAY 2

After getting the idea of an oldschool 3D design I started implementing the CSS.

I also created the maze and possible paths using a JS based grid. I added images of my characters and defined their individual start position.

I added a keydown event listener to make pacman move and improved the navigation to make it as smooth and easy to use as possible. I practiced my problem-solving skills after facing problems of overlaping intervals and uncontrollable movements of pacman after pressing many keys quickly.



### DAY 3

I created basic movement functions for the ghosts that selected a random direction at each junction. I spent some time fixing bugs of ghosts jumping between two adjacent positions and disappering ghosts at the end of the tunnels. Thats when I prevented the characters from reversing their movement and forbid the entry to the tunnels.

I also added score counting and defined values for different achievements in the game.


### DAY 4

I added a hunting mode which changes the conditions of the game. I also defined the end of game when the player doesn't have any lives left or all dots have been eaten. The score will display with a text overlay. All intervals are cleared and the keydown event is removed so the board freezes.


### DAY 5
I created another textoverlay showing a countdown before the game starts and my first stretch goal of implementing background music and sound effects inlcuding a volume icon was hit.


### DAY 6
On the last day I devoted myself to the most difficult part of the project. I added an advanced pathfinder for two of the ghosts so they will always find a path towards pacman.

![Alt text](README-files/ghost-1-movement.png)



### WHEN THE PAGE LOADS

![Alt text](README-files/when-page-loads.png)


## WHEN THE GAME STARTS

![Alt text](README-files/when-play-button-is-clicked.png)

The 'Ready?' message is followed by a countdown. After the pop-up disappears the characters appear on the maze and the ghosts start to leave their cage.

![Alt text](README-files/characters-appear.png)


## WHEN THE GHOASTS MOVE

![Alt text](README-files/ghosts-move.png)

Two of the ghosts follow a smiliar but not identical algorithm which checks their own position in relation to pacman's position before every step they take. To make it easer for the player the ghosts are not allowed to go through the tunnel. Usually they keep moving without turning around but there are a few exemptions like if the ghost and pacman are on the same horizontal or vertical level.




## WHEN PACMAN MOVES

The navigation of pacman is designed to make the best user experience possible. When the player presses a key pacman will keep moving until it hits a wall or dies and if another key is pressed it will take the first possible turn into the new direction.

![Alt text](README-files/pacman-moves-up.png)


## WHEN THE GAME ENDS

![Alt text](README-files/player-lost.png)




## KEY LEARNINGS
- Defining global variables to implement different conditions into the game (eg to set hunting mode, to check current direction)
- Using intervals to make character keep moving, taking the next possible turn when player sets a new direction and keep moving into the new direction
- Removing intervals and setting new intervals and timeouts at the right timing
- Implementing text overlays using JavaScript
- Using rotations in CSS to define curved title
- Using roations to change background images depending on current direction of pacman

## CHALLENGES
- Smooth ghosts movements
- Understanding the positions of two characters in a grid and using if-statements to follow a path towards the other character
- Overlapping intervals and timeouts


## BUGS

The game works smoothly and there are no obvious bugs.

Still there is room for optimization like stopping the ghosts from crossing paths. The consequence is that one ghost seems to disappear until they both separate their paths again.


## IDEAS FOR FURTHER IMPLEMENTATIONS

- Recurring appearing fruits for extra score points
- Each ghost follows a unique algorithm
- Responsive design
- Persistend leaderboard
- Increasing difficulty throughout the levels
