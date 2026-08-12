// =====================================================
// DOM ELEMENTS
// =====================================================

const cells = document.querySelectorAll(".cell");
const statusElement = document.getElementById("status");
const subtitleElement = document.getElementById("subtitle");
const pvpModeButton = document.getElementById("pvpMode");
const aiModeButton = document.getElementById("aiMode");
const difficultyContainer =	document.getElementById("difficultyContainer");
const difficultyButtons = document.querySelectorAll(".difficulty-btn");

const newGameButton = document.getElementById("newGame");
const resetScoreButton = document.getElementById("resetScore");
const scoreXElement = document.getElementById("scoreX");
const scoreOElement = document.getElementById("scoreO");
const scoreDrawElement = document.getElementById("scoreDraw");
const playerXBox = document.getElementById("playerXBox");
const playerOBox = document.getElementById("playerOBox");
const playerXLabel = document.getElementById("playerXLabel");
const playerOLabel = document.getElementById("playerOLabel");


// =====================================================
// CONSTANTS
// =====================================================
const HUMAN = "X";
const COMPUTER = "O";

const winningCombinations = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6]
];

// =====================================================
// GAME STATE
// =====================================================
let board = [ "", "", "", "", "", "", "", "", "" ];
let currentPlayer = "X";
let gameMode = "pvp";
let difficulty = "medium";
let gameActive = true;

// =====================================================
// SCORE
// =====================================================
let scoreX = 0;
let scoreO = 0;
let scoreDraw = 0;

// =====================================================
// CELL EVENTS
// =====================================================
cells.forEach(cell => {
	cell.addEventListener("click",handleCellClick);
});

// =====================================================
// HANDLE CELL CLICK
// =====================================================
function handleCellClick(event) {
	if (!gameActive) {
		return;
	}

	/*
	 * In AI mode the user controls X.
	 * Prevent clicking during the computer turn.
	 */
	if (gameMode === "ai" && currentPlayer === COMPUTER) {
		return;
	}

	const index = Number(event.target.dataset.index);

	// Don't allow occupied cells
	if (board[index] !== "") {
		return;
	}

	// Make player's move
	makeMove(index,currentPlayer);

	// Check game result
	const result = getGameResult(board);
	if (result) {
		finishGame(result);
		return;
	}

	// Switch player
	switchPlayer();

	/*
	 * If AI mode and O is next,
	 * let the computer play.
	 */
	if (gameMode === "ai" && currentPlayer === COMPUTER) {
		gameActive = false;
		statusElement.textContent =	"Computer is thinking...";
		playerXBox.classList.remove("active");
		playerOBox.classList.add("active");

		setTimeout(computerMove,400);
	}
}

// =====================================================
// MAKE MOVE
// =====================================================
function makeMove(index,player) {
	board[index] = player;
	const cell = cells[index];
	
	cell.textContent = player;
	cell.classList.add(player.toLowerCase());

	cell.disabled = true;
}

// =====================================================
// SWITCH PLAYER
// =====================================================
function switchPlayer() {
	currentPlayer =	currentPlayer === "X" ?	"O" :"X";
	updateTurnDisplay();
}

// =====================================================
// UPDATE TURN DISPLAY
// =====================================================
function updateTurnDisplay() {
	if (gameMode === "ai") {
		if (currentPlayer === HUMAN) {
			statusElement.textContent =	"Your turn (X)";
		} else {
			statusElement.textContent =	"Computer's turn (O)";
		}
	} else {
		statusElement.textContent =	`Player ${currentPlayer}'s turn`;
	}

	playerXBox.classList.remove("active");
	playerOBox.classList.remove("active");

	if (currentPlayer === "X") {
		playerXBox.classList.add("active");
	} else {
		playerOBox.classList.add("active");
	}
}

// =====================================================
// COMPUTER MOVE
// =====================================================
function computerMove() {
	if (!gameActive &&
		currentPlayer !== COMPUTER) {
		return;
	}

	let bestMove;

	if (difficulty === "easy") {
		bestMove = getRandomMove();
	} else if (difficulty === "medium") {
		/*
		 * 50% chance of making the
		 * optimal Minimax move.
		 *
		 * 50% chance of random move.
		 */
		if (Math.random() < 0.5) {
			bestMove = findBestMove();
		} else {
			bestMove = getRandomMove();
		}
	} else {
		bestMove = findBestMove();
	}

	// Make AI move
	if (bestMove !== -1) {
		makeMove(bestMove,COMPUTER);
	}

	// Check result
	const result = getGameResult(board);
	if (result) {
		finishGame(result);
		return;
	}

	// Switch back to player
	currentPlayer = HUMAN;
	gameActive = true;
	updateTurnDisplay();
}

// =====================================================
// RANDOM MOVE
// =====================================================
function getRandomMove() {
	const availableMoves = [];

	for (let i = 0; i < board.length; i++) {
		if (board[i] === "") {
			availableMoves.push(i);
		}
	}

	if (availableMoves.length === 0) {
		return -1;
	}

	const randomIndex =	Math.floor(Math.random() * availableMoves.length);

	return availableMoves[randomIndex];
}

// =====================================================
// MINIMAX
// =====================================================
function minimax(currentBoard,depth,isMaximizing) {

	const result = getGameResult(currentBoard);

	// Computer wins
	if (result && result.winner === COMPUTER) {
		return 10 - depth;
	}

	// Human wins
	if (result && result.winner === HUMAN) {
		return depth - 10;
	}

	// Draw
	if (result && result.type === "draw") {
		return 0;
	}

	if (isMaximizing) {
		let bestScore = -Infinity;

		for (let i = 0; i < currentBoard.length; i++) {
			if (currentBoard[i] === "") {
				currentBoard[i] = COMPUTER;

				const score = minimax(currentBoard, depth + 1, false);

				// Undo move
				currentBoard[i] = "";
				bestScore =	Math.max(bestScore,	score);
			}
		}

		return bestScore;
	} else {
		let bestScore =	Infinity;

		for (let i = 0; i < currentBoard.length; i++) {
			if (currentBoard[i] === "") {
				currentBoard[i] = HUMAN;

				const score = minimax(currentBoard,	depth + 1, true);

				// Undo move
				currentBoard[i] = "";

				bestScore = Math.min(bestScore,	score);
			}
		}

		return bestScore;
	}
}

// =====================================================
// FIND BEST AI MOVE
// =====================================================
function findBestMove() {

	let bestScore = -Infinity;
	let bestMove = -1;

	for (let i = 0; i < board.length; i++) {
		if (board[i] === "") {
			// Try move
			board[i] = COMPUTER;
			const score = minimax(board,0,false);

			// Undo move
			board[i] = "";
			if (score > bestScore) {
				bestScore =	score;
				bestMove =	i;
			}
		}
	}

	return bestMove;
}

// =====================================================
// GET GAME RESULT
// =====================================================
function getGameResult(currentBoard) {

	// Check winner
	for (const combination of winningCombinations) {
		const [a,b,c] = combination;
		if (currentBoard[a] !== "" && currentBoard[a] === currentBoard[b] && currentBoard[a] === currentBoard[c]) {
			return {
				type: "win",
				winner: currentBoard[a],
				combination: combination
			};
		}
	}

	// Check draw
	if (currentBoard.every(cell => cell !== "")) {
		return {
			type: "draw"
		};
	}

	return null;
}

// =====================================================
// FINISH GAME
// =====================================================
function finishGame(result) {

	gameActive = false;

	if (result.type === "win") {

		// Highlight winning cells
		result.combination.forEach(
			index => {
				cells[index].classList.add("winner");
			}
		);

		// X wins
		if (result.winner === "X") {
			scoreX++;
			scoreXElement.textContent =	scoreX;
			if (gameMode === "ai") {
				statusElement.textContent =	"You win!";
			} else {
				statusElement.textContent =	"Player X wins!";
			}
		} else {
			scoreO++;
			scoreOElement.textContent =	scoreO;
			if (gameMode === "ai") {
				statusElement.textContent =	"Computer wins!";
			} else {
				statusElement.textContent =	"Player O wins!";
			}
		}
	} else {
		scoreDraw++;
		scoreDrawElement.textContent = scoreDraw;
		statusElement.textContent =	"It's a draw!";
	}

	// Disable board
	cells.forEach(cell => {
		cell.disabled = true;
	});

	playerXBox.classList.remove("active");
	playerOBox.classList.remove("active");
}

// =====================================================
// START NEW GAME
// =====================================================
function startNewGame() {
	board = ["","","","","","","","",""];

	currentPlayer = "X";
	gameActive = true;

	cells.forEach(cell => {
		cell.textContent = "";
		cell.disabled = false;
		cell.classList.remove("x","o","winner");
	});

	updateTurnDisplay();
}

// =====================================================
// CHANGE GAME MODE
// =====================================================
function changeGameMode(mode) {

	gameMode = mode;
	if (mode === "pvp") {

		// Active button
		pvpModeButton.classList.add("active");
		aiModeButton.classList.remove("active");

		// Hide difficulty
		difficultyContainer.classList.remove("show");
		subtitleElement.textContent = "Two players compete against each other";

		playerXLabel.textContent = "Player X";
		playerOLabel.textContent = "Player O";
	} else {

		// Active button
		pvpModeButton.classList.remove("active");
		aiModeButton.classList.add("active");

		// Show difficulty
		difficultyContainer.classList.add("show");
		subtitleElement.textContent = "You are X. Computer is O.";
		playerXLabel.textContent = "You (X)";
		playerOLabel.textContent = "Computer (O)";
	}

	// Start a fresh game
	startNewGame();
}

// =====================================================
// CHANGE DIFFICULTY
// =====================================================
function changeDifficulty(selectedDifficulty) {

	difficulty = selectedDifficulty;

	// Update button UI
	difficultyButtons.forEach(
		button => {
			button.classList.remove("active");
		}
	);

	const selectedButton = document.querySelector(`[data-difficulty="${selectedDifficulty}"]`);
	if (selectedButton) {
		selectedButton.classList.add("active");
	}

	// Start fresh game
	startNewGame();

	// Update status
	if (gameMode === "ai") {
		const difficultyName = selectedDifficulty.charAt(0).toUpperCase() +	selectedDifficulty.slice(1);

		statusElement.textContent =	`${difficultyName} mode - Your turn`;
	}
}

// =====================================================
// RESET SCORE
// =====================================================
function resetScore() {
	scoreX = 0;
	scoreO = 0;
	scoreDraw = 0;

	scoreXElement.textContent =	"0";
	scoreOElement.textContent =	"0";
	scoreDrawElement.textContent = "0";

	startNewGame();
}

// =====================================================
// MODE EVENTS
// =====================================================
pvpModeButton.addEventListener("click",	() => {
		changeGameMode("pvp");
	}
);

aiModeButton.addEventListener("click", () => {
		changeGameMode("ai");
	}
);

// =====================================================
// DIFFICULTY EVENTS
// =====================================================

difficultyButtons.forEach(
	button => {
		button.addEventListener("click",() => {
				const selectedDifficulty =	button.dataset.difficulty;
				changeDifficulty(selectedDifficulty);
			}
		);
	}
);

// =====================================================
// OTHER EVENTS
// =====================================================
newGameButton.addEventListener("click",	startNewGame);
resetScoreButton.addEventListener("click",resetScore);

// =====================================================
// INITIALIZE
// =====================================================
changeGameMode("pvp");