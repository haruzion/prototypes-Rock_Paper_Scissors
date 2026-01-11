// Game state
let playerScore = 0;
let computerScore = 0;

// DOM elements
const playerScoreEl = document.getElementById('player-score');
const computerScoreEl = document.getElementById('computer-score');
const resultTextEl = document.getElementById('result-text');
const playerChoiceEl = document.getElementById('player-choice');
const computerChoiceEl = document.getElementById('computer-choice');
const choiceBtns = document.querySelectorAll('.choice-btn');
const resetBtn = document.getElementById('reset-btn');

// Choice emojis
const choiceEmojis = {
    rock: '✊',
    paper: '✋',
    scissors: '✌️'
};

// Choice names in Japanese
const choiceNames = {
    rock: 'グー',
    paper: 'パー',
    scissors: 'チョキ'
};

// Add event listeners to choice buttons
choiceBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const playerChoice = btn.dataset.choice;
        if (playerChoice && choiceEmojis[playerChoice]) {
            playRound(playerChoice);
        }
    });
});

// Add event listener to reset button
resetBtn.addEventListener('click', resetGame);

// Play a round
function playRound(playerChoice) {
    const computerChoice = getComputerChoice();
    const result = determineWinner(playerChoice, computerChoice);
    
    // Update displays
    playerChoiceEl.textContent = choiceEmojis[playerChoice] || '?';
    computerChoiceEl.textContent = choiceEmojis[computerChoice] || '?';
    
    // Update result text
    updateResultText(result, playerChoice, computerChoice);
    
    // Update scores
    if (result === 'win') {
        playerScore++;
        playerScoreEl.textContent = playerScore;
    } else if (result === 'lose') {
        computerScore++;
        computerScoreEl.textContent = computerScore;
    }
    
    // Add animation
    resultTextEl.classList.add('result-animation');
    setTimeout(() => {
        resultTextEl.classList.remove('result-animation');
    }, 500);
}

// Get computer's random choice
function getComputerChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

// Determine the winner
function determineWinner(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        return 'draw';
    }
    
    if (
        (playerChoice === 'rock' && computerChoice === 'scissors') ||
        (playerChoice === 'paper' && computerChoice === 'rock') ||
        (playerChoice === 'scissors' && computerChoice === 'paper')
    ) {
        return 'win';
    }
    
    return 'lose';
}

// Update result text
function updateResultText(result, playerChoice, computerChoice) {
    // Remove previous result classes
    resultTextEl.classList.remove('win', 'lose', 'draw');
    
    const playerName = choiceNames[playerChoice] || playerChoice;
    const computerName = choiceNames[computerChoice] || computerChoice;
    
    if (result === 'win') {
        resultTextEl.textContent = `あなたの勝ち！ ${playerName} vs ${computerName}`;
        resultTextEl.classList.add('win');
    } else if (result === 'lose') {
        resultTextEl.textContent = `あなたの負け... ${playerName} vs ${computerName}`;
        resultTextEl.classList.add('lose');
    } else {
        resultTextEl.textContent = `引き分け！ ${playerName} vs ${computerName}`;
        resultTextEl.classList.add('draw');
    }
}

// Reset game
function resetGame() {
    playerScore = 0;
    computerScore = 0;
    playerScoreEl.textContent = '0';
    computerScoreEl.textContent = '0';
    resultTextEl.textContent = '手を選んでください';
    resultTextEl.classList.remove('win', 'lose', 'draw');
    playerChoiceEl.textContent = '?';
    computerChoiceEl.textContent = '?';
}
