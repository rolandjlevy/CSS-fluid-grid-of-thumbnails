
const card = document.querySelector('.card');
const container = document.querySelector('.card-container');

function createCard(counter) {
  const clonedCard = card.cloneNode(true);
  const imgName = 'image-' + counter;
  clonedCard.style.backgroundImage = getRandomImage();
  clonedCard.style.display = 'block';
  clonedCard.id = imgName;
  // clonedCard.addEventListener('click', (e) => {
  //   captureThenDownload(imgName, imgName + '.png')
  // });
  container.appendChild(clonedCard);
}

function getRandomImage() {
  const randomNum = Math.floor(Math.random() * 10000);
  return `url('https://source.unsplash.com/random/${randomNum}')`;
}

function init(n) {
  let counter = n;
  while (counter > 0) {
    createCard(counter);
    counter--;
  }
}

init(10);

document.querySelector('.total-images').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    const input = Number(e.target.value).toFixed(0);
    if (input <= 0) return;
    console.log(111)
    container.innerHTML = "";
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