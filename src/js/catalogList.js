//styles
import '../scss/catalogList.scss';

//libraries
import * as $ from 'jquery';
import ymaps from 'ymaps';
import '../vendors/mortgageCalc.js';
import '../vendors/script.js';

import { owlGallery } from '../vendors/owlGallery.js';
import { createHint } from '../vendors/map.js';

//Components
// import header from '../components/header.html';
// import footer from "../components/footer.html";

function select(btn, content, activeClass) {
  $(btn).on('click', function (e) {
    e.preventDefault();
    if (e.target === this) {
      $(this).toggleClass(activeClass).find(content).slideToggle();
    }
  });

  $(document).on('mousedown', function (e) {
    if (!$(btn).is($(e.target)) && !$(btn).is($(e.target))) {
      Array.from($(btn)).forEach((elem) => {
        if ($(elem).hasClass(activeClass))
          $(elem).toggleClass(activeClass).find(content).slideToggle();
      });
    }
  });
}

function addNulles(str) {
  let arr = [...str];
  for (let i = str.length; i >= 0; i -= 3) {
    if (i !== str.length && str.length !== 3) arr.splice(i, 0, ' ');
  }
  return arr.join('');
}

// +7 937 021-23-06
function strToPhone(str) {
  let array = [...str];
  array.splice(2, 0, ' ');
  array.splice(6, 0, ' ');
  array.splice(10, 0, '-');
  array.splice(13, 0, '-');

  return array.join('');
}

function transformText(classElement, callback) {
  $(`${classElement}`).each((_, item) => {
    let val = $(item).text();
    $(item).text(callback(val));
  });
}

$(() => {
  // $('#root').prepend(header);
  // $(".content").append(footer);

  owlGallery('.carouselFlats', {
    dots: false,
    autoWidth: false,
    items: 1,
    margin: 16,
    loop: false,
    nav: true,
    mouseDrag: false,
    touchDrag: false,
    navContainer: '.carouselFlats__buttons',
    navClass: ['carouselFlats__prev', 'carouselFlats__next'],
    responsive: {
      1240: {
        items: 4,
        margin: 20,
        autoWidth: false
      },
      768: {
        margin: 20,
        autoWidth: false,
        items: 2
      }
    }
  });
  owlGallery('.carouselFlatPhotos', {
    dots: true,
    autoWidth: false,
    items: 1,
    margin: 16,
    loop: false
  });

  select('.nav__item_button', '.nav__options', 'nav__active');
  select('.filter__item_select', '.filter__options', 'filter__item_active');
  select('.flats__notice_select', '.flats__options', 'flats__active');

  ymaps
    .load('https://api-maps.yandex.ru/2.1/?apikey=2b543523-54f1-4a9f-af8a-8333795718cd&lang=ru_RU')
    .then((maps) => {
      const myMap = new maps.Map('yandexMap', {
        center: [51.544542, 43.160542],
        zoom: 13,
        controls: ['zoomControl']
      });

      $('.flat').each((index, item) => {
        let latitude = Number($(item).find('.flat__latitude').text());
        let longitude = Number($(item).find('.flat__longitude').text());
        let address = $(item).find('.flat__address').text();
        let oldprice = $(item).find('.flat__price').text();
        let link = $(item).find('.flat__desc').attr('href');

        if (latitude && longitude)
          myMap.geoObjects.add(
            createHint(maps, address, `${oldprice} ₽`, [latitude, longitude], link)
          );
      });
    })
    .catch((error) => console.log('Failed to load Yandex Maps', error));

  $('.owl-dot').mouseenter(function () {
    if (!$(this).hasClass('active')) $(this).trigger('click');
  });

  $('.owl-dot').on('click', function () {
    if ($(this).hasClass('active')) {
      let ref = $(this).parents('.flat').find('.flat__desc').attr('href');
      window.open(ref);
    }
  });
});
