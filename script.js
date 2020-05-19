
const card = document.querySelector('.card');
const container = document.querySelector('.card-container');

function createCard() {
  const clonedCard = card.cloneNode(true);
  clonedCard.style.backgroundImage = getRandomImage();
  clonedCard.style.display = 'block';
  container.appendChild(clonedCard);
}

function getRandomImage() {
  const randomNum = Math.floor(Math.random() * 1000);
  return `url('https://source.unsplash.com/random/${randomNum}')`;
}

let images = 32;

while (images > 0) {
  createCard();
  images--;
}

