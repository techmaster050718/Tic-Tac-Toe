let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let scores = { X: 0, O: 0 };

const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

const cells = document.querySelectorAll('.cell');
const gameInfo = document.getElementById('gameInfo');
const popup = document.getElementById('popup');
const popupTitle = document.getElementById('popupTitle');
const popupMessage = document.getElementById('popupMessage');
const scoreX = document.getElementById('scoreX');
const scoreO = document.getElementById('scoreO');

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

function handleCellClick(e) {
    const index = e.target.dataset.index;

    if (gameBoard[index] !== '' || !gameActive) return;

    gameBoard[index] = currentPlayer;
    e.target.textContent = currentPlayer;
    e.target.classList.add('taken', 'placed', currentPlayer === 'X' ? 'x-mark' : 'o-mark');

    if (checkWin()) {
        gameActive = false;
        highlightWinner();
        scores[currentPlayer]++;
        updateScoreboard();
        showPopup(`🎉 Player ${currentPlayer} Wins!`, `Amazing job, Player ${currentPlayer}! You're the champion!`);
    } else if (checkDraw()) {
        gameActive = false;
        showPopup(`🤝 It's a Draw!`, `Great game! Both players showed excellent skills!`);
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        updateGameInfo();
    }
}

function checkWin() {
    return winPatterns.some(pattern => pattern.every(index => gameBoard[index] === currentPlayer));
}

function checkDraw() {
    return gameBoard.every(cell => cell !== '');
}

function highlightWinner() {
    winPatterns.forEach(pattern => {
        if (pattern.every(index => gameBoard[index] === currentPlayer)) {
            pattern.forEach(index => cells[index].classList.add('winner'));
        }
    });
}

function updateGameInfo() {
    const playerClass = currentPlayer === 'X' ? 'player-x' : 'player-o';
    gameInfo.innerHTML = `Player <span class="${playerClass}">${currentPlayer}</span>'s Turn`;
}

function updateScoreboard() {
    scoreX.textContent = scores.X;
    scoreO.textContent = scores.O;
}

function showPopup(title, message) {
    popupTitle.textContent = title;
    popupMessage.textContent = message;
    popup.classList.add('active');
}

function closePopup() {
    popup.classList.remove('active');
}

function restartFromPopup() {
    closePopup();
    resetGame();
}

function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('taken', 'placed', 'winner', 'x-mark', 'o-mark');
    });

    updateGameInfo();
}