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
  playerSides: {
    player1: "player-cards",
    player1BOX: document.querySelector('#player-cards'),
    computer: "computer-cards",
    computerBOX: document.querySelector('#computer-cards')
  },
  fieldCards: {
    player: document.getElementById('player-field-card'),
    computer: document.getElementById('computer-field-card')
  },
  button: document.getElementById('next-duel')
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

  if (fieldSide === state.playerSides.player1) {
    cardImage.addEventListener('mouseover', () => {
      drawSelectCard(idCard);
    });

    cardImage.addEventListener('click', () => {
      setCardsField(cardImage.getAttribute('data-id'));
    });
  }

  return cardImage;
}

async function setCardsField(idCard) {
  await removeAllCardsImages();

  let computerCardId = await getRandomIdCard();

  state.fieldCards.player.style.display = 'block';
  state.fieldCards.computer.style.display = 'block';

  state.fieldCards.player.src = cardData[idCard].image;
  state.fieldCards.computer.src = cardData[computerCardId].image;

  let duelResults = await checkDuelResults(idCard, computerCardId);

  await updateScore();
  await drawButton(duelResults);
}

async function drawButton(text) {
  state.button.innerText = text;
  state.button.style.display = 'block';
}

async function updateScore() {
  state.score.scoreBox.innerText = `Win: ${state.score.playerScore} | Lose: ${state.score.computerScore}`;
}

async function checkDuelResults(playerCardId, computerCardId) {
  let duelResults = 'Tie';
  let playerCard = cardData[playerCardId];

  if (playerCard.WinOf.includes(computerCardId)) {
    duelResults = 'Win';
    state.score.playerScore++;
  }

  if (playerCard.LoseOf.includes(computerCardId)) {
    duelResults = 'Lose';
    state.score.computerScore++;
  }

  return duelResults;
}

async function removeAllCardsImages() {
  let {computerBOX, player1BOX} = state.playerSides;
  let imageElements = computerBOX.querySelectorAll('img');
  imageElements.forEach((image) => image.remove());

  imageElements = player1BOX.querySelectorAll('img');
  imageElements.forEach((image) => image.remove());
}

async function drawSelectCard(index) {
  state.cardSprites.avatar.src = cardData[index].image;
  state.cardSprites.name.innerText = cardData[index].name;
  state.cardSprites.type.innerText = "Attribute: " + cardData[index].type;
}

async function drawCards(cardNumbers, fieldSide) {
  for (let i = 0; i < cardNumbers; i++) {
    const randomIdCard = await getRandomIdCard();
    const cardImage = await createCardImage(randomIdCard, fieldSide);

    document.getElementById(fieldSide).appendChild(cardImage);
  }
}

function init() {
  drawCards(5, state.playerSides.player1);
  drawCards(5, state.playerSides.computer);
}

init();