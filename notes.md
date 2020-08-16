### Something for later
+ try to make each image downloadable using html2canvas
+ This goes inside getRandomImage promise

```js
clonedCard.addEventListener('click', (e) => {
  captureThenDownload(imgId, imgId + '.png')
});
```

```js
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
```

### Ideas
+ Masonry dynamic column flexbox from codepen: https://codepen.io/CAWeissen/pen/xxxQpba