# AI Tic-Tac-Toe Game

An interactive browser-based **Tic-Tac-Toe game** built with HTML5,
CSS3, and JavaScript. It supports **Player vs Player** and **Player vs
AI** modes, multiple difficulty levels, score tracking, automatic
win/draw detection, and a computer opponent powered by the **Minimax
algorithm**.

## Features

-   Player vs Player mode
-   Player vs AI mode
-   Easy, Medium, and Hard difficulty levels
-   Minimax-based AI on Hard difficulty
-   Automatic winner and draw detection
-   Score tracking
-   Turn indicator
-   Restart / New Game functionality
-   Responsive browser-based interface

## Technologies Used

-   HTML5
-   CSS3
-   JavaScript
-   DOM Manipulation
-   Minimax Algorithm
-   Responsive Web Design

## How the AI Works

The computer opponent changes its move-selection strategy according to
the selected difficulty:

-   **Easy:** Primarily selects from available positions using a random
    strategy.
-   **Medium:** Combines tactical checks with less predictable move
    selection.
-   **Hard:** Uses the **Minimax algorithm** to evaluate possible future
    game states and choose an optimal move.

At Hard difficulty, Minimax recursively evaluates possible moves while
considering the best response available to the human player.

``` text
Current Board
     |
     v
Find Available Moves
     |
     v
Simulate Possible Moves
     |
     v
Evaluate Future Game States
     |
     +-- AI Win      -> +10
     +-- Draw        ->   0
     +-- Player Win  -> -10
     |
     v
Compare Move Scores
     |
     v
Select Optimal Move
```

## Game Flow

``` text
Start Game
    |
    v
Select Game Mode
    |
    +-------------------+
    |                   |
    v                   v
Player vs Player   Player vs AI
    |                   |
    +---------+---------+
              |
              v
        Initialize Board
              |
              v
          Player Move
              |
              v
        Validate Move
              |
              v
         Update Board
              |
              v
       Check Win / Draw
              |
        +-----+------+
        |            |
     Finished?      Continue
        |            |
        v            v
   Show Result   AI Turn?
                     |
                     v
              Select AI Strategy
                     |
             Easy / Medium / Hard
                     |
                     v
                  AI Move
```

## Project Structure

``` text
ai-tic-tac-toe/
|
+-- index.html
+-- css/
|   +-- style.css
+-- js/
|   +-- game.js
+-- assets/
|   +-- images/
+-- README.md
```

Adjust the file names above if your implementation uses a different
structure.

## Getting Started

No backend, database, or package installation is required.

### 1. Clone the repository

``` bash
git clone https://github.com/debashish-ghosh2018/Javascript-AI-Tic-Tac-Toe-Game.git
```

### 2. Open the project directory

``` bash
cd ai-tic-tac-toe
```

### 3. Run the game

Open `index.html` in a modern web browser.

You can also run it with a local development server such as the VS Code
Live Server extension.

## How to Play

1.  Start the game in your browser.
2.  Choose **Player vs Player** or **Player vs AI**.
3.  When using Player vs AI, select a difficulty level.
4.  Click an empty square to make a move.
5.  Players alternate between X and O.
6.  The first player to complete a row, column, or diagonal wins.
7.  If every square is occupied without a winner, the game ends in a
    draw.
8.  Use Restart or New Game to play again.

## Winning Combinations

The game evaluates eight winning combinations:

``` text
Rows
[0, 1, 2]
[3, 4, 5]
[6, 7, 8]

Columns
[0, 3, 6]
[1, 4, 7]
[2, 5, 8]

Diagonals
[0, 4, 8]
[2, 4, 6]
```

Board positions:

``` text
+---+---+---+
| 0 | 1 | 2 |
+---+---+---+
| 3 | 4 | 5 |
+---+---+---+
| 6 | 7 | 8 |
+---+---+---+
```

## Programming Concepts Demonstrated

This project demonstrates practical use of:

-   JavaScript functions, arrays, and objects
-   DOM manipulation
-   Browser event handling
-   Game-state management
-   Input and move validation
-   Conditional logic and loops
-   Recursive algorithms
-   Decision-tree evaluation
-   Minimax search
-   Responsive UI development
-   Algorithmic problem solving

## Screenshots

Add your project screenshots to the repository and update the paths
below.

### Game Mode Selection

``` markdown
![Game Mode Selection](assets/images/game-mode.png)
```

### Player vs AI Gameplay

``` markdown
![Player vs AI Gameplay](assets/images/gameplay.png)
```

### Game Result

``` markdown
![Game Result](assets/images/game-result.png)
```

## Future Enhancements

Potential improvements include:

-   Online multiplayer
-   Player profiles and custom player names
-   Persistent match history
-   Leaderboards
-   AI-vs-AI simulation
-   Sound effects
-   Dark/light theme
-   Game statistics dashboard
-   Additional board sizes
-   Improved animations
-   Progressive Web App support

## Project Purpose

The project was created as a portfolio demonstration of **frontend
development, JavaScript application logic, state management, recursion,
decision-tree evaluation, and Minimax-based game AI**.

The term AI in this project refers to **algorithmic game AI** rather
than machine learning or generative AI.

## Author

**Debashish Ghosh**\
Senior Full Stack Software Engineer

-   Portfolio: https://debashish-ghosh2018.github.io/my-portfolio/
-   GitHub: https://github.com/debashish-ghosh2018/Javascript-AI-Tic-Tac-Toe-Game
-   LinkedIn: https://www.linkedin.com/in/debashish-ghosh-309b9b15/

## License

This project is intended for learning, demonstration, and portfolio
purposes.

If you plan to publish it as an open-source project, consider adding an
appropriate license such as the MIT License.

## Support

If you find the project useful, consider starring the repository.
