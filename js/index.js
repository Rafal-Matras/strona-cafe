const closeGalery = document.querySelector('[data-close]');
const galeryContainer = document.querySelector('[data-galery-container]');
const galeryImg = document.querySelector('[data-galery-img]');
const galeryMeetings = document.querySelector('[data-galery-meetings]');
const galeryProducts = document.querySelector('[data-galery-products]');
const hamburger = document.querySelector('[data-hamburger]');
const header = document.querySelector('[data-header]');
const leftArrow = document.querySelector('[data-left]');
const link = document.querySelectorAll('[data-link]');
const menu = document.querySelector('[data-header__nav]');
const opinionsBox = document.querySelectorAll('[data-opinions-box]');
const personeImg = document.querySelectorAll('[data-persone-img]');
const personeName = document.querySelectorAll('[data-persone-name]');
const rightArrow = document.querySelector('[data-right]');

let galeryActive = false;
let galeryChoice;
let imageNumber;
let imageNumberL = 1;
let opinionsFlag = false;
let people;
let scrollNumber = null;

(async()=>{
  const data = await(await fetch('https://randomuser.me/api/?results=3&nat=gb')).json();
  people = data.results;
  peopleOpinions()
})();

window.addEventListener('scroll', () => {
  header.classList.toggle('active', window.scrollY > 0);
});

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  menu.classList.toggle('active');
});

link.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    menu.classList.toggle('active');
    if (galeryActive) {
      galeryContainer.classList.add('disable');
      galeryActive = false;
      imageNumberL = 1;
    }
  });
});

galeryProducts.addEventListener('click', () => {
  galeryContainer.classList.toggle('disable');
  galeryImg.setAttribute('src', './img/galery/image1.jpg');
  galeryActive = !galeryActive;
  galeryChoice = 'image';
  imageNumber = 26;
  scrollNumber = scrollY;
});

galeryMeetings.addEventListener('click', () => {
  galeryContainer.classList.toggle('disable');
  galeryImg.setAttribute('src', './img/galery/spotkania1.jpg');
  galeryActive = !galeryActive;
  galeryChoice = 'spotkania';
  imageNumber = 8;
  scrollNumber = scrollY;
});

leftArrow.addEventListener('click', () => {
  if (imageNumberL === 1) imageNumberL = imageNumber + 1;
  imageNumberL--;
  galeryImg.setAttribute(
    'src',
    `./img/galery/${galeryChoice}${imageNumberL}.jpg`
  );
});

rightArrow.addEventListener('click', () => {
  imageNumberL++;
  if (imageNumberL > imageNumber) imageNumberL = 1;
  galeryImg.setAttribute(
    'src',
    `./img/galery/${galeryChoice}${imageNumberL}.jpg`
  );
});

closeGalery.addEventListener('click', () => {
  galeryContainer.classList.toggle('disable');
  galeryActive = !galeryActive;
  imageNumberL = 1;
});

window.addEventListener('scroll', () => {
  if (scrollNumber !== null) {
    if (scrollNumber - 700 > scrollY || scrollNumber + 700 < scrollY) {
      scrollNumber = null;
      galeryContainer.classList.toggle('disable');
      galeryActive = !galeryActive;
      imageNumberL = 1;
    }
  }
  if (opinionsFlag) {
    if (scrollNumber - 600 > scrollY || scrollNumber + 600 < scrollY) {
      scrollNumber = null;
      opinionsFlag = false;
      opinionsBox.forEach(box => {
        box.classList.remove('active');
      });
    }
  }
});

const peopleOpinions = () => {
  let i = 0;
  personeImg.forEach(item => {
    item.style.setProperty(
      'background-image',
      `url('${people[i].picture.medium}')`
    );
    i++;
  });
  let j = 0;
  personeName.forEach(item => {
    item.innerHTML = `${people[j].name.first} ${people[j].name.last}`;
    j++;
  });
};

opinionsBox.forEach(box => {
  box.addEventListener('touchstart', () => {
    if (opinionsFlag) {
      box.classList.remove('active');
      opinionsFlag = false;
    }
  });
});

opinionsBox.forEach(box => {
  const moreText = box.querySelector('[data-option-text]');
  moreText.addEventListener('touchend', () => {
    box.classList.add('active');
    opinionsFlag = true;
    scrollNumber = scrollY;
    console.log('ok');
  });
});

opinionsBox.forEach(box => {
  if (opinionsFlag) {
    box.addEventListener('touchend', () => {
      box.classList.toggle('active');
    });
  }
});