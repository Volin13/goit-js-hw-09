// -------------------------------------------------
// Make background circles
// -------------------------------------------------
function circlePaint() {
  const backgroundCanvas = document.querySelector('.background');
  const bodyHeight = document.body.offsetHeight;
  const bodyWidth = document.body.offsetWidth;
  const canvasHeight = bodyHeight - Math.round(bodyHeight / 5);
  backgroundCanvas.style.height = canvasHeight + 'px';

  for (let i = 0; i <= bodyHeight - 100; i += 40 + Math.round(Math.random() * 200)) {
    // Create new div
    let circleDiv = document.createElement('div');
    circleDiv.className = 'circle circle--' + Math.round(Math.random() * (3 - 1) + 1);
    //Add element to background
    backgroundCanvas.append(circleDiv);
    // Define random radius 40->100 px
    let radius = 40 + Math.round(60 * Math.random());
    // Define random horizontal position
    let leftPosition = Math.round(bodyWidth * Math.random());

    circleDiv.style.height = radius + 'px';
    circleDiv.style.top = i + 'px';
    circleDiv.style.left = leftPosition + 'px';
    let diffWidth = bodyWidth - leftPosition - radius;
    // Проверяем помещаемся ли в ширину документа
    if (diffWidth >= 0) {
      circleDiv.style.width = radius + 'px';
      // console.log(circleDiv.style.width);
    } else {
      // Еслине помещаемся - обрезаем ширину круга
      circleDiv.style.width = radius + diffWidth + 'px';
    }
  }
}
circlePaint();
// -------------------------------------------------
// Paralax on circles
// -------------------------------------------------
let oldOff = 0;
window.addEventListener('scroll', function () {
  const backgroundCanvas = document.querySelector('.background');
  const backgroundCurrentOffset = backgroundCanvas.offsetTop;

  let pageOffset = window.pageYOffset;
  let newOff = Math.round(pageOffset / 5);
  if (newOff > oldOff) {
    oldOff = newOff;
    backgroundCanvas.style.top = backgroundCurrentOffset + 1 + 'px';
  }
  if (newOff < oldOff) {
    oldOff = newOff;
    backgroundCanvas.style.top = backgroundCurrentOffset - 1 + 'px';
  }
});

// -------------------------------------------------
// Mobile menu open, close
// -------------------------------------------------
const mobileMenu = document.querySelector('.mob-menu');
const menuBtnOpen = document.querySelector('.mob-menu__button-open');
const menuBtnClose = document.querySelector('.mob-menu__button-close');

const toggleMenu = () => {
  mobileMenu.classList.toggle('is-mob-menu-open');
};

menuBtnOpen.addEventListener('click', toggleMenu);
menuBtnClose.addEventListener('click', toggleMenu);

// -------------------------------------------------
// Header menu + mobile menu smooth scroll and close mobile menu
// -------------------------------------------------
document.querySelectorAll('a[href^="#"').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const mobileMenu = document.querySelector('.mob-menu');
    const toggleMenu = () => {
      mobileMenu.classList.toggle('is-mob-menu-open');
    };
    if (mobileMenu.classList.contains('is-mob-menu-open')) {
      mobileMenu.classList.toggle('is-mob-menu-open');
    }
    let href = this.getAttribute('href').substring(1);

    const scrollTarget = document.getElementById(href);

    // const topOffset = document.querySelector('.scrollto').offsetHeight;
    const topOffset = 80; // если не нужен отступ сверху
    const elementPosition = scrollTarget.getBoundingClientRect().top;
    const offsetPosition = elementPosition - topOffset;

    window.scrollBy({
      top: offsetPosition,
      behavior: 'smooth',
    });
  });
});

// -------------------------------------------------
// Hidden text show and hide on windowresize
// -------------------------------------------------
const stashText = document.querySelector('.stash-text');
const stashTextBtn = document.querySelector('.stash-text-btn');
const lessStashTextBtn = document.querySelector('.stash-text-btn-less');
const readMoreTxt = document.querySelector('.js-read-more-txt');
const readMoreTxtBtn = document.querySelector('.js-btn-read-more-open');
const lessRreadMoreTxtBtn = document.querySelector('.js-btn-read-more-close');

const toggleHiddenText = () => {
  stashText.classList.toggle('invisible');
  stashTextBtn.classList.toggle('invisible');
  lessStashTextBtn.classList.toggle('invisible');
};
const toggleProgramText = () => {
  readMoreTxt.classList.toggle('invisible');
  readMoreTxtBtn.classList.toggle('invisible');
  lessRreadMoreTxtBtn.classList.toggle('invisible');
};
readMoreTxtBtn.addEventListener('click', toggleProgramText);
stashTextBtn.addEventListener('click', toggleHiddenText);
lessRreadMoreTxtBtn.addEventListener('click', toggleProgramText);
lessStashTextBtn.addEventListener('click', toggleHiddenText);

if (document.documentElement.clientWidth >= 1280) {
  if (stashText.classList.contains('invisible')) {
    stashText.classList.toggle('invisible');
  }
  if (readMoreTxt.classList.contains('invisible')) {
    readMoreTxt.classList.toggle('invisible');
  }
}
window.addEventListener('resize', function () {
  if (document.documentElement.clientWidth >= 1280) {
    if (stashText.classList.contains('invisible')) {
      stashText.classList.toggle('invisible');
    }
    if (!stashTextBtn.classList.contains('invisible')) {
      stashTextBtn.classList.toggle('invisible');
    }
    if (!lessStashTextBtn.classList.contains('invisible')) {
      lessStashTextBtn.classList.toggle('invisible');
    }

    if (readMoreTxt.classList.contains('invisible')) {
      readMoreTxt.classList.toggle('invisible');
    }
    if (!readMoreTxtBtn.classList.contains('invisible')) {
      readMoreTxtBtn.classList.toggle('invisible');
    }
    if (!lessRreadMoreTxtBtn.classList.contains('invisible')) {
      lessRreadMoreTxtBtn.classList.toggle('invisible');
    }
  }
  if (document.documentElement.clientWidth < 1280) {
    if (!stashText.classList.contains('invisible')) {
      stashText.classList.add('invisible');
      stashTextBtn.classList.remove('invisible');
      lessStashTextBtn.classList.add('invisible');
    }
    if (!readMoreTxt.classList.contains('invisible')) {
      readMoreTxt.classList.add('invisible');
      readMoreTxtBtn.classList.remove('invisible');
      lessRreadMoreTxtBtn.classList.add('invisible');
    }
  }
});

// -------------------------------------------------
// Reviews slider
// -------------------------------------------------
$(document).ready(function () {
  $('.reviews-slide').slick({
    arrows: true,
    slidesToShow: 3,
    autoplay: false,
    centerMode: true,
    centerPadding: '0px',
    speed: 2000,
    draggable: false,
    responsive: [
      {
        breakpoint: 1279,
        settings: {
          centerMode: true,
          centerPadding: '0px',
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          centerPadding: '0px',
          centerMode: true,
          speed: 500,
        },
      },
    ],
  });
});
// Change slide number
var $status = $('.slide-number');
var $slickElement = $('.reviews-slide');
$slickElement.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
  var i = (currentSlide ? currentSlide : 0) + 1;
  $status.text(i + '/' + slick.slideCount);
});
