/**
 * ROCK PAPER SCISSORS LOGIC
 * Educator Note: We use an "isAnimating" state variable to lock the game.
 * If a player rapidly clicks buttons while the hands are shaking,
 * we ignore those clicks until the current round finishes.
 */

// ==========================================
// 1. DOM SELECTION
// ==========================================
const playerScoreDisplay = document.querySelector("#player-score");
const computerScoreDisplay = document.querySelector("#computer-score");
const playerHand = document.querySelector("#player-hand");
const computerHand = document.querySelector("#computer-hand");
const statusText = document.querySelector("#status-text");
const choiceButtons = document.querySelectorAll(".choice-btn");
const resetBtn = document.querySelector("#reset-btn");

// ==========================================
// 2. STATE MANAGEMENT
// ==========================================
let playerScore = 0;
let computerScore = 0;
// Locks the game controls while the animation is playing
let isAnimating = false;

// Maps our choice strings to the correct FontAwesome icon classes
const iconMap = {
    rock: "fa-hand-back-fist",
    paper: "fa-hand",
    scissors: "fa-hand-scissors",
};

// ==========================================
// 3. CORE FUNCTIONS
// ==========================================

/**
 * Handles the logic for a single round of the game
 * @param {string} playerChoice - 'rock', 'paper', or 'scissors'
 */
const playRound = (playerChoice) => {
    // 1. Check if game is locked. If yes, exit the function immediately.
    if (isAnimating) return;

    // 2. Lock the game and update status
    isAnimating = true;
    statusText.textContent = "Rock... Paper... Scissors...";

    // 3. Reset hands to default "Rock" state for the shake animation
    playerHand.className = `fa-solid ${iconMap.rock} text-7xl text-blue-500 player-hand-static animate-shake-player`;
    computerHand.className = `fa-solid ${iconMap.rock} text-7xl text-rose-500 computer-hand-static animate-shake-computer`;

    // 4. Determine the computer's choice randomly
    // Math.random() generates a decimal between 0 and 1.
    // Multiplying by 3 gives a number between 0 and 2.999.
    // Math.floor() rounds it down to exactly 0, 1, or 2.
    const choices = ["rock", "paper", "scissors"];
    const computerChoice = choices[Math.floor(Math.random() * 3)];

    // 5. Wait for the shake animation to finish before revealing the result
    // Why setTimeout? It delays the execution of the code inside it by X milliseconds.
    setTimeout(() => {
        // Stop shaking animations
        playerHand.classList.remove("animate-shake-player");
        computerHand.classList.remove("animate-shake-computer");

        // Update icons to reveal the actual choices
        playerHand.className = `fa-solid ${iconMap[playerChoice]} text-7xl text-blue-500 player-hand-static`;
        computerHand.className = `fa-solid ${iconMap[computerChoice]} text-7xl text-rose-500 computer-hand-static`;

        // Determine the winner and update scores
        evaluateWinner(playerChoice, computerChoice);

        // Unlock the game for the next round
        isAnimating = false;
    }, 1200); // Wait 1.2 seconds
};

/**
 * Compares choices, determines the winner, and updates UI
 */
const evaluateWinner = (player, computer) => {
    // Draw condition
    if (player === computer) {
        statusText.textContent = "It's a draw!";
        return; // Exit the function early
    }

    // Player win conditions
    const playerWins = (player === "rock" && computer === "scissors") || (player === "paper" && computer === "rock") || (player === "scissors" && computer === "paper");

    if (playerWins) {
        playerScore++;
        playerScoreDisplay.textContent = playerScore;
        statusText.textContent = "You win this round!";
    } else {
        // If it's not a draw and the player didn't win, the computer wins
        computerScore++;
        computerScoreDisplay.textContent = computerScore;
        statusText.textContent = "Computer wins this round!";
    }
};

/**
 * Resets the entire game state back to zero
 */
const resetGame = () => {
    // Prevent reset during animation
    if (isAnimating) return;

    // Reset State
    playerScore = 0;
    computerScore = 0;

    // Reset UI text
    playerScoreDisplay.textContent = playerScore;
    computerScoreDisplay.textContent = computerScore;
    statusText.textContent = "Choose your weapon";

    // Reset visual hands back to default static rocks
    playerHand.className = `fa-solid ${iconMap.rock} text-7xl text-blue-500 player-hand-static`;
    computerHand.className = `fa-solid ${iconMap.rock} text-7xl text-rose-500 computer-hand-static`;
};

// ==========================================
// 4. EVENT LISTENERS
// ==========================================

// Add a click listener to all three choice buttons
// Why forEach? Because `querySelectorAll` returns a NodeList (like an array) of all matching buttons.
choiceButtons.forEach((button) => {
    button.addEventListener("click", () => {
        // We retrieve the specific choice from the button's data-choice HTML attribute
        const choice = button.getAttribute("data-choice");
        playRound(choice);
    });
});

// Reset button listener
resetBtn.addEventListener("click", resetGame);
