'use strict';

let Container = document.querySelector('section');

let Button = document.querySelector('section' + 'div');

let image1 = document.querySelector('section img:first-child');

let image2 = document.querySelector('section img:nth-child(2)');

let image3 = document.querySelector('section img:nth-child(3)');

let clicks = 0;
let maxClicks = 25;

let imageCount = 6;
const state = {
  produtsArray: [],
  indexArray: [],
};

function Product(name, src) {
  this.name = name;
  this.src = src;
  this.views = 0;
  this.clicks = 0;
}

function getRandomNumber() {
  return Math.floor(Math.random() * state.produtsArray.length);
}

function productRenders() {
  while (state.indexArray.length < imageCount) {
    let randomNumber = getRandomNumber();
    if (!state.indexArray.includes(randomNumber)) {
      state.indexArray.push(randomNumber);
    }
  }

  let product1 = state.indexArray.shift();
  let product2 = state.indexArray.shift();
  let product3 = state.indexArray.shift();
  console.log(state.produtsArray, product1);
  image1.src = state.produtsArray[product1].src;
  console.log(image1);
  image2.src = state.produtsArray[product2].src;
  image3.src = state.produtsArray[product3].src;

  image1.alt = state.produtsArray[product1].name;
  image2.alt = state.produtsArray[product2].name;
  image3.alt = state.produtsArray[product3].name;

  state.produtsArray[product1].views++;
  state.produtsArray[product2].views++;
  state.produtsArray[product3].views++;
}
function newProductClick(event) {
  if (event.target === Container) {
    alert('Please click on a image');
  }

  clicks++;

  let productClick = event.target.alt;
  for (let i = 0; i < state.produtsArray.length; i++) {
    if (productClick === state.produtsArray[i].name) {
      state.produtsArray[i].clicks++;

      break;
    }
  }
  if (clicks === maxClicks) {
    Container.removeEventListener('click', newProductClick);

    renderChart();
    Container.className = 'no-voting';
  } else {
    productRenders();
  }
}
function renderChart() {
  let productName = [];
  let productClick = [];
  let productView = [];

  for (let i = 0; i < state.produtsArray.length; i++) {
    productName.push(state.produtsArray[i].name);

    productClick.push(state.produtsArray[i].clicks);

    productView.push(state.produtsArray[i].views);
  }

  const chartData = {
    labels: productName,
    datasets: [
      {
        label: 'Views',
        data: productView,
        backgroundColor: ['rgba (255,98,140, 0.4'],
        borderColor: ['rgb(255, 98, 131'],
        borderWidth: 1,
      },
      {
        label: 'Click(s)',
        data: productClick,
        backgroundColor: ['rgba(200, 140, 72, 0.2'],
        borderColor: ['rgb(255, 158, 64)'],
        borderWidth: 1,
      },
    ],
  };

  const config = {
    type: 'bar',
    data: chartData,
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  };

  let chartCanvas = document.getElementById('myChart').getContext('2d');
  const myChart = new Chart(chartCanvas, config);
}
let wineGlass = new Product('Wine Glass', 'images/wine-glass.jpg');
let chair = new Product('Chair', 'images/chair.jpg');
let waterCan = new Product('Water Can', 'images/water-can.jpg');
let banana = new Product('Banana', 'images/banana.jpg');
let bag = new Product('Bag', 'images/bag.jpg');
let bathroom = new Product('Tissue Stand', 'images/bathroom.jpg');
let boots = new Product('Boots', 'images/boots.jpg');
let breakfast = new Product('Toaster', 'images/breakfast.jpg');
let bubblegum = new Product('Gum', 'images/bubblegum.jpg');
let cthulhu = new Product('Monster', 'images/cthulhu.jpg');
let dragon = new Product('Dragon', 'images/dragon.jpg');
let pen = new Product('Pen Cutlery', 'images/pen.jpg');
let pet = new Product('Pet Sweeper', 'images/pet-sweep.jpg');
let tauntaun = new Product('Sleeping Bag', 'images/tauntaun.jpg');
let unicorn = new Product('Unicorn Meatballs', 'images/unicorn.jpg');
let scissors = new Product('Pizza Cutter', 'images/scissors.jpg');
let shark = new Product('Shark', 'images/shark.jpg');
let sweep = new Product('Broom', 'images/sweep.png');

state.produtsArray.push(
  wineGlass,
  chair,
  waterCan,
  banana,
  bag,
  bathroom,
  boots,
  breakfast,
  bubblegum,
  cthulhu,
  dragon,
  pen,
  pet,
  tauntaun,
  unicorn,
  scissors,
  shark,
  sweep
);
console.log(state.produtsArray);

productRenders();
Container.addEventListener('click', newProductClick);

let settings = {
  open: null,
  comment: '',
};

let details = document.getElementsByTagName('details');
let commentBox = document.getElementById('commentBox');
let openDetail = null;

function loadSettings() {
  let getSettings = localStorage.getItem('settings');
  if (getSettings) {
    console.log(getSettings);
    settings = JSON.parse(getSettings);
    console.log(settings);
  }
}

function saveSettings() {
  let stringify = JSON.stringify(settings);
  localStorage.setItem('settings', stringify);
  console.log(typeof stringify);
}

function pageLoad() {
  let savedSettings = localStorage.getItem('settings');
  if (!savedSettings) {
    return;
  }

  loadSettings();
  if (settings.open !== null) {
    details[settings.open].setAttribute('open', 'open');
  }
  commentBox.value = settings.comment;
}

for (let i = 0; i < details.length; i++) {
  details[i].addEventListener('click', function () {
    if (settings.open === i) {
      settings.open = null;
      saveSettings();
      return;
    }
    openDetail = i;
    settings.open = i;
    saveSettings();
    for (let j = 0; j < details.length; j++) {
      if (j !== openDetail) {
        details[j].removeAttribute('open');
      }
    }
  });
}

pageLoad();

commentBox.addEventListener('input', function () {
  settings.comment = commentBox.value;
  saveSettings();
});
