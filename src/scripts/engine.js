const state = {
  score: {
    playerScore: 0,
    computerScore: 0,
    scoreBox: document.getElementById('score-points')
  },
  cardSprites: {
    avatar: document.getElementById('card-image'),
    name: document.getElementById('card-name'),
    type:document.getElementById('card-type')
  },
  fieldCards: {
    player: document.getElementById('player-field-card'),
    computer: document.getElementById('computer-field-card')
  },
  button: document.getElementById('next-duel')
}

const playerSides = {
  player1: "player-cards",
  computer: "computer-cards"
}

async function getRandomIdCard() {
  const randomIndex = Math.floor(Math.random() * cardData.length);

  return cardData[randomIndex].id;
}

async function createCardImage(idCard, fieldSide) {
  const cardImage = document.createElement('img');
  cardImage.setAttribute('height', '100px');
  cardImage.setAttribute('src', 'src/assets/icons/card-back.png');
  cardImage.setAttribute('data-id', idCard);
  cardImage.classList.add('card');

  return cardImage;
}

async function drawCards(cardNumbers, fieldSide) {
  for (let i = 0; i < cardNumbers; i++) {
    const randomIdCard = await getRandomIdCard();
    const cardImage = await createCardImage(randomIdCard, fieldSide);

    document.getElementById(fieldSide).appendChild(cardImage);
  }
}

function init() {
  drawCards(5, playerSides.player1);
  drawCards(5, playerSides.computer);
}

init();