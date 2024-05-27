const cardsArray = [
    'image1.png', 'image1.png', 'image2.png', 'image2.png',
    'image3.png', 'image3.png', 'image4.png', 'image4.png',
    'image5.png', 'image5.png', 'image6.png', 'image6.png',
    'image7.png', 'image7.png', 'image8.png', 'image8.png',
    'image9.png', 'image9.png', 'image10.png', 'image10.png'
];

let gameBoard = document.getElementById('gameBoard');
let cards = [];
let firstCard = null;
let secondCard = null;
let lockBoard = false;

function createBoard() {
    cardsArray.sort(() => 0.5 - Math.random());

    for (let i = 0; i < cardsArray.length; i++) {
        let card = document.createElement('div');
        card.classList.add('card');
        card.dataset.value = cardsArray[i];
        let img = document.createElement('img');
        img.src = `images/${cardsArray[i]}`;
        console.log(`Loading image: ${img.src}`); // Log the image source path
        card.appendChild(img);
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
        cards.push(card);
    }
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    console.log('Card clicked:', this);

    this.classList.add('flip');

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    if (firstCard.dataset.value === secondCard.dataset.value) {
        disableCards();
    } else {
        unflipCards();
    }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

createBoard();