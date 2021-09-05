const nannidoSection = document.querySelector('#nannido');
const nannidoOptions = document.querySelector('.nannido__options');
const gameSection = document.querySelector('#game');
const gameField = document.querySelector('.game__field');
const gameTimer = document.querySelector('.game__timer');
const gameBtn = document.querySelector('.game__btn');
const popupSection = document.querySelector('#popup');
const popupMsg = document.querySelector('.popup__msg');
const popupBtn = document.querySelector('.popup__btn');

let appleNum = 0;
let bombNum = 0;
let timer = 0;
//한줄에 오는 상자의 개수
let row = 0;
let score = 0;

//難易度選択・ゲームスタート
nannidoOptions.addEventListener('click', (item) => {
  const selectedNannidoOption = item.target.innerHTML;
  //selectedNannidoOption種類 : Easy, Normal, Hard
  startGame(selectedNannidoOption);
});

//カードを選択
gameSection.addEventListener('click', (item) => onCardClick(item));

//gameSectionの中止ボタンクリック
gameBtn.addEventListener('click', () => {
  returnToNannido();
});

//ポップアップボタンクリック
popupBtn.addEventListener('click', () => {
  returnToNannido();
});

function startGame(selectedNannidoOption) {
  //難易度によってカード、タイマー、配置を設定
  settingGame(selectedNannidoOption);

  //難易度が選択されていない場合、難易度Sectionへ
  if (appleNum == 0) {
    returnToNannido();
    return;
  }

  //カードを画面に表示
  displayCards();

  //ゲームsectionを画面に表示
  nannidoSection.style.display = 'none';
  gameSection.style.display = 'flex';

  startGameTimer();
}

function settingGame(selectedNannidoOption) {
  gameField.innerHTML = '';
  score = 0;

  switch (selectedNannidoOption) {
    case 'Easy':
      appleNum = 3;
      bombNum = 1;
      timer = 5;
      row = 2;
      break;
    case 'Normal':
      appleNum = 6;
      bombNum = 3;
      timer = 7;
      row = 3;
      break;
    case 'Hard':
      appleNum = 11;
      bombNum = 5;
      timer = 9;
      row = 4;
      break;
    default:
      appleNum = 0;
      break;
  }
}

function displayCards() {
  var cards = new Array();

  for (let i = 1; i <= appleNum + bombNum; i++) {
    var data = new Object();
    if (i <= appleNum) {
      data.name = 'apple';
      data.order = randomNumber();
    } else if (i > appleNum) {
      data.name = 'bomb';
      data.order = randomNumber();
    }
    cards.push(data);
  }
  cards.sort((a, b) => {
    if (a.order < b.order) return -1;
    if (a.order > b.order) return 1;
    return 0;
  });

  cards.forEach((card, index) => {
    const cardDiv = document.createElement('div');
    cardDiv.setAttribute('class', card.name);
    if (card.name == 'apple') {
      cardDiv.innerHTML = '🍎';
    } else if (card.name == 'bomb') {
      cardDiv.innerHTML = '💣';
    }
    cardDiv.style.width = `${400 / row}px`;
    cardDiv.style.height = `${400 / row}px`;
    cardDiv.style.lineHeight = `${400 / row}px`;
    gameField.appendChild(cardDiv);
  });
}

function randomNumber() {
  return Math.random();
}

function startGameTimer() {
  let remainingTimeSec = timer;
  gameTimer.innerHTML = remainingTimeSec;
  timer = setInterval(() => {
    if (remainingTimeSec <= 0) {
      finishGame('time-end');
      return;
    }
    gameTimer.innerHTML = --remainingTimeSec;
  }, 1000);
}

function onCardClick(item) {
  let card = item.target.innerHTML;
  if (card == '💣') {
    finishGame('loose');
  } else if (card == '🍎') {
    item.target.innerHTML = '';
    score++;
    if (score == appleNum) {
      finishGame('win');
    }
  }
  console.log(card);
}

function returnToNannido() {
  clearInterval(timer);
  popupSection.style.display = 'none';
  gameSection.style.display = 'none';
  nannidoSection.style.display = 'flex';
}

function finishGame(msg) {
  gameField.innerHTML = '';
  clearInterval(timer);

  switch (msg) {
    case 'win':
      popupMsg.innerHTML = 'Win! 🥳';
      popupSection.style.display = 'flex';
      break;

    case 'loose':
      popupMsg.innerHTML = 'Loose 🥲 <br/> You chose Bomb';
      popupSection.style.display = 'flex';
      break;

    case 'time-end':
      popupMsg.innerHTML = 'Loose 🥲 <br/> Time End';
      popupSection.style.display = 'flex';
      break;

    default:
      break;
  }
}
