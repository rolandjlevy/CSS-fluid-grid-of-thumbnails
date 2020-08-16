const card = document.querySelector('.card');
const container = document.querySelector('.card-container');
const totalImages = document.querySelector('.total-images');
const status = document.querySelector('.status');

const promisesArray = [];

function createCard(counter) {
  const clonedCard = card.cloneNode(true);
  const imgId = 'image-' + counter;
  clonedCard.id = imgId;
  const promise = getRandomImage()
  .then(randomImg => {
    clonedCard.style.backgroundImage = `url('${randomImg}')`;
    clonedCard.style.display = 'block';
    clonedCard.dataset.url = randomImg;
    clonedCard.addEventListener('click', (e) => {
      window.open(e.target.dataset.url, '_blank');
    });
    status.textContent = `Loaded: ${counter + 1}`;
    container.appendChild(clonedCard);
    // clonedCard.addEventListener('click', (e) => {
    //   captureThenDownload(imgId, imgId + '.png')
    // });
  })
  .catch(err => {
    console.log('Error', err);
  });
  promisesArray.push(promise);
}

function getRandomImage() {
  const randomNum = Math.floor(Math.random() * 10000);
  const url = `https://source.unsplash.com/random/${randomNum}`;
  return new Promise((resolve, reject) => {
    fetch(url)
    .then(data => {
      resolve(data.url);
    })
    .catch(err => {
      reject(err);
    });
  });
}

function init(n) {
  totalImages.value = n;
  let counter = 0;
  while (counter < n) {
    createCard(counter++);
  }
  Promise.all(promisesArray)
  .then(values => {
    status.classList.add('hide');
  })
  .catch(err => { 
    status.innerHTML = err;
  });
}

const maxImages = 25;
init(maxImages);

totalImages.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    const input = Number(e.target.value).toFixed(0);
    if (input <= 0) return;
    container.innerHTML = "";
    status.classList.remove('hide');
    init(input);
  }
});

function captureThenDownload(divName, outputFilename) {
  window.scrollTo(0, 0);
  const options = {
    logging: true, 
    letterRendering: 1,
    allowTaint: false, 
    removeContainer: true,
    useCORS: true,
    scrollX: 0,
    scrollY: 0
  };

  const div = document.querySelector("#" + divName);
  html2canvas(div, options).then(canvas => {
    const a = document.createElement('a');
    a.href = canvas.toDataURL('image/png', 0.9);
    a.download = outputFilename;
    a.click();
  });
}