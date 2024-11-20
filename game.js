const cardValues = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const gameBoard = document.getElementById('gameBoard');
let cardArray = [...cardValues, ...cardValues];
let flippedCards = [];
let matchedPairs = 0;
let lockBoard = false;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function createCard(cardValue) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.value = cardValue;
    card.addEventListener('click', flipCard);
    return card;
}

function flipCard() {
    if (lockBoard || this.classList.contains('flipped')) return;
    this.classList.add('flipped');
    this.textContent = this.dataset.value;
    flippedCards.push(this);

    if (flippedCards.length === 2) {
        checkForMatch();
    }
}

function checkForMatch() {
    lockBoard = true;
    const [firstCard, secondCard] = flippedCards;

    if (firstCard.dataset.value === secondCard.dataset.value) {
        matchedPairs++;
        resetFlippedCards();
    } else {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            firstCard.textContent = '';
            secondCard.textContent = '';
            resetFlippedCards();
        }, 1000);
    }
}

function resetFlippedCards() {
    flippedCards = [];
    lockBoard = false;

    if (matchedPairs === cardValues.length) {
        setTimeout(() => {
            alert('You won!');
            resetGame();
        }, 500);
    }
}

function resetGame() {
    matchedPairs = 0;
    cardArray = shuffle([...cardValues, ...cardValues]);
    gameBoard.innerHTML = '';
    cardArray.forEach(value => {
        const card = createCard(value);
        gameBoard.appendChild(card);
    });
}

document.getElementById('resetButton').addEventListener('click', resetGame);

// Initialize the game
resetGame();
