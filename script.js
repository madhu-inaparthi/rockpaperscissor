// script.js for Rock Paper Scissors Game
// DOM elements
const playerScoreSpan = document.getElementById('player-score');
const computerScoreSpan = document.getElementById('computer-score');
const roundSpan = document.getElementById('round');
const resultDiv = document.getElementById('result');
const finalMessageDiv = document.getElementById('final-message') || document.getElementById('rps-final-message');
const playAgainBtn = document.getElementById('play-again');
const choices = document.querySelectorAll('.rps-choice');
const playerChoiceIcon = document.getElementById('player-choice-icon');
const computerChoiceIcon = document.getElementById('computer-choice-icon');

// Game state
let playerScore = 0;
let computerScore = 0;
let round = 1;
const maxRounds = 5;

// Icon map for choices
const choiceIcons = {
    rock: '🪨',
    paper: '📄',
    scissors: '✂️',
    '?': '?'
};

// Helper: Get computer choice
function getComputerChoice() {
    const options = ['rock', 'paper', 'scissors'];
    return options[Math.floor(Math.random() * options.length)];
}

// Helper: Decide winner
function getWinner(player, computer) {
    if (player === computer) return 'tie';
    if (
        (player === 'rock' && computer === 'scissors') ||
        (player === 'scissors' && computer === 'paper') ||
        (player === 'paper' && computer === 'rock')
    ) {
        return 'player';
    }
    return 'computer';
}

// Update UI
function updateUI() {
    playerScoreSpan.textContent = playerScore;
    computerScoreSpan.textContent = computerScore;
    roundSpan.textContent = round <= maxRounds ? round : maxRounds;
}

// Handle choice click
function handleChoice(e) {
    if (round > maxRounds) return;
    const playerChoice = e.currentTarget.id;
    const computerChoice = getComputerChoice();
    const winner = getWinner(playerChoice, computerChoice);

    // Show icons for choices
    playerChoiceIcon.textContent = choiceIcons[playerChoice];
    computerChoiceIcon.textContent = choiceIcons[computerChoice];

    // Feedback message
    let feedback = '';
    if (winner === 'player') {
        playerScore++;
        feedback = 'You win this round!';
        resultDiv.style.color = '#6ee7b7';
    } else if (winner === 'computer') {
        computerScore++;
        feedback = 'Computer wins this round!';
        resultDiv.style.color = '#ff6b6b';
    } else {
        feedback = "It's a tie!";
        resultDiv.style.color = '#f7b801';
    }
    resultDiv.textContent = feedback;
    round++;
    updateUI();
    if (round > maxRounds) {
        showFinalMessage();
    }
}

// Show final message
function showFinalMessage() {
    let message = '';
    if (playerScore > computerScore) {
        message = 'Congratulations! You Won The Game!';
        resultDiv.style.color = '#6ee7b7';
    } else if (computerScore > playerScore) {
        message = 'Game Over! Computer Wins The Game!';
        resultDiv.style.color = '#ff6b6b';
    } else {
        message = "It's a Tie Game! Try Again!";
        resultDiv.style.color = '#f7b801';
    }
    finalMessageDiv.textContent = message;
    playAgainBtn.style.display = 'inline-block';
    resultDiv.textContent = '';
}

// Reset game
function resetGame() {
    playerScore = 0;
    computerScore = 0;
    round = 1;
    playerChoiceIcon.textContent = '?';
    computerChoiceIcon.textContent = '?';
    resultDiv.textContent = 'Make your choice!';
    resultDiv.style.color = '#fff';
    finalMessageDiv.textContent = '';
    playAgainBtn.style.display = 'none';
    updateUI();
}

// Event listeners
choices.forEach(btn => btn.addEventListener('click', handleChoice));
playAgainBtn.addEventListener('click', resetGame);

// Initial UI
resetGame();
