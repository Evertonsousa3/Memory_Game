const openModal = () => {
  const modal = document.getElementById('myModal');
  modal.style.display = 'block';
}

const closeModal = () => {
  const modal = document.getElementById('myModal');
  modal.style.display = 'none';
}

const startGame = () => {
  const playerNameInput = document.getElementById('playerName').value;
  if (playerNameInput.trim() !== '') {
    spanPlayer.innerHTML = playerNameInput;
    localStorage.setItem('player', playerNameInput);
    closeModal();
    startTimer();
  } else {
    alert('Por favor, insira um nome válido.');
  }
}


const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');

const characters = [
  'Boston Celtics',
  'Dallas Mavericks',
  'Denver Nuggets',
  'Milwaukee Bucks',
  'Minessota Timberwolves',
  'New York Knicks',
  'Oklahoma Thunder',
  'Orlando Magic',
  'Philadelphia 76ers',
  'Sacramento Kings',
];

const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.className = className;
  return element;
}

let firstCard = '';
let secondCard = '';

const checkEndGame = () => {
  const disabledCards = document.querySelectorAll('.disabled-card');

  if (disabledCards.length === 20) {
    clearInterval(this.loop);
    alert(`Parabéns, ${spanPlayer.innerHTML}! Seu tempo foi de: ${timer.innerHTML}`);
    const restartButton = document.getElementById('restartButton');
    restartButton.style.display = 'block';
    
    // Adicione um ouvinte de evento ao botão para chamar a função restartGame
    restartButton.addEventListener('click', restartGame);

  }
}

const checkCards = () => {
  const firstCharacter = firstCard.getAttribute('data-character');
  const secondCharacter = secondCard.getAttribute('data-character');

  if (firstCharacter === secondCharacter) {

    firstCard.firstChild.classList.add('disabled-card');
    secondCard.firstChild.classList.add('disabled-card');

    firstCard = '';
    secondCard = '';

    checkEndGame();

  } else {
    setTimeout(() => {

      firstCard.classList.remove('reveal-card');
      secondCard.classList.remove('reveal-card');

      firstCard = '';
      secondCard = '';

    }, 500);
  }

}

const revealCard = ({ target }) => {

  if (target.parentNode.className.includes('reveal-card')) {
    return;
  }

  if (firstCard === '') {

    target.parentNode.classList.add('reveal-card');
    firstCard = target.parentNode;

  } else if (secondCard === '') {

    target.parentNode.classList.add('reveal-card');
    secondCard = target.parentNode;

    checkCards();

  }
}

const createCard = (character) => {

  const card = createElement('div', 'card');
  const front = createElement('div', 'face front');
  const back = createElement('div', 'face back');

  front.style.backgroundImage = `url('images/${character}.png')`;

  card.appendChild(front);
  card.appendChild(back);

  card.addEventListener('click', revealCard);
  card.setAttribute('data-character', character)

  return card;
}

const loadGame = () => {
  const duplicateCharacters = [...characters, ...characters];

  const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);

  shuffledArray.forEach((character) => {
    const card = createCard(character);
    grid.appendChild(card);
  });
}

const startTimer = () => {

  this.loop = setInterval(() => {
    const currentTime = +timer.innerHTML;
    timer.innerHTML = currentTime + 1;
  }, 1000);

}

const restartGame = () => {
  const cards = document.querySelectorAll('.card');
  
  // Remova todas as cartas do grid
  cards.forEach(card => card.remove());

  // Reinicie as variáveis de controle
  firstCard = '';
  secondCard = '';
  
  // Reinicie o temporizador
  clearInterval(this.loop);
  timer.innerHTML = '0';
  startTimer();

  // Carregue um novo jogo
  loadGame();
}

window.onload = () => {
  spanPlayer.innerHTML = localStorage.getItem('player');
  openModal();
  startTimer();
  loadGame();
  
  // Agora que o botão está no DOM, ajuste o estilo
  document.getElementById('restartButton').style.display = 'none';
}