const $ = (selector) => document.querySelector(selector);
const card = $('.card');
const totalImages = $('.total-images');
const baseUrl = 'https://source.unsplash.com/random';
const maxImages = getComputedStyle($('body')).getPropertyValue('--max-images').trim();
const promisesArray = [];
const limit = 300;

$('#year').textContent = new Date().getFullYear();

function createGrid({maxImages}) {
  totalImages.value = maxImages;
  totalImages.classList.add('locked');
  totalImages.disabled = true;
  let counter = 0;
  while (counter < maxImages) {
    createCard(counter++);
  }
  Promise.all(promisesArray)
  .then(values => {
    $('.status').classList.add('hidden');
    totalImages.disabled = false;
    totalImages.focus();
  })
  .catch(err => { 
    $('.status').textContent = err;
  });
}

function createCard(counter) {
  const clonedCard = card.cloneNode(true);
  clonedCard.id = 'image-' + counter;
  const promise = getRandomImage()
  .then(randomImg => {
    clonedCard.classList.remove('hidden');
    clonedCard.style.backgroundImage = `url('${randomImg.url}&w=250&q=50&dpr=1')`;
    clonedCard.dataset.url = randomImg.url + "&w=1500&q=95&dpr=1";
    clonedCard.addEventListener('click', (e) => {
      window.open(e.target.dataset.url, '_blank');
    });
    $('.status').textContent = `Loaded: ${counter + 1}`;
    $('.card-container').appendChild(clonedCard);
  })
  .catch(err => {
    console.log('Error', err);
  });
  promisesArray.push(promise);
}

function getRandomImage() {
  const randomNum = Math.floor(Math.random() * 10000);
  const url = `${baseUrl}/${randomNum}`;
  return new Promise((resolve, reject) => {
    fetch(url)
    .then(data => resolve(data))
    .catch(err => reject(err));
  });
}

totalImages.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    $('.status').textContent = `Loaded:`;
    totalImages.classList.remove('error');
    totalImages.classList.remove('overload');
    const maxImages = Number(e.target.value).toFixed(0);
    if (maxImages < 1) {
      totalImages.classList.add('error');
      return;
    } else if (maxImages > limit) {
      totalImages.classList.add('overload');
      return;
    }
    $('.card-container').innerHTML = '';
    $('.status').classList.remove('hidden');
    createGrid({maxImages});
  }
});

createGrid({maxImages});
totalImages.focus();