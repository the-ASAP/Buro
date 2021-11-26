//styles
import '../scss/object.scss';

//libraries
import * as $ from 'jquery';
import ymaps from 'ymaps';
import '../vendors/mortgageCalc.js';
import { owlGallery } from '../vendors/owlGallery.js';

import '../vendors/script.js';
import { createHint } from '../vendors/map.js';
import IMask from 'imask';

// Components
// import header from '../components/header.html';
// import footer from '../components/footer.html';

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

const latitude = Number($('.map__latitude').text());
const longitude = Number($('.map__longitude').text());
const address = $('.object__text').text();
const object = $('.object__title').text();

$(() => {
  // $('#root').prepend(header);
  // $('#root').append(footer);

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
  owlGallery('.carouselReviews', {
    dots: false,
    autoWidth: false,
    items: 1,
    margin: 16,
    loop: false,
    nav: true,
    mouseDrag: false,
    touchDrag: false,
    navContainer: '.carouselReviews__buttons',
    navClass: ['carouselReviews__prev', 'carouselReviews__next'],
    responsive: {
      768: {
        items: 3,
        margin: 20,
        autoWidth: false
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
  owlGallery('.carouselObjectPhotos', {
    dots: false,
    autoWidth: true,
    items: 1,
    margin: 16,
    loop: false,
    nav: true,
    mouseDrag: false,
    touchDrag: false,
    navContainer: '.carouselObjectPhotos__buttons',
    navClass: ['carouselObjectPhotos__prev', 'carouselObjectPhotos__next']
  });

  select('.nav__item_button', '.nav__options', 'nav__active');
  select('.filter__item_select', '.filter__options', 'filter__item_active');

  $('.owl-dot').mouseenter(function () {
    if (!$(this).hasClass('active')) $(this).trigger('click');
  });

  $('.owl-dot').on('click', function () {
    if ($(this).hasClass('active')) {
      let ref = $(this).parents('.flat').find('.flat__desc').attr('href');
      window.open(ref);
    }
  });

  $('.total__button').on('click', function () {
    let totalPrice = $('.total__price').text();
    $('.modalReq__totalMort').text(totalPrice);
    $('.modalReq').addClass('modalReq_active');
  });
  // Закрытие
  $('.modalReq').on('click', function (e) {
    if ($(e.target).hasClass('modalReq_active')) $(this).removeClass('modalReq_active');
  });
  $('.modalReq__close').on('click', function () {
    $('.modalReq').removeClass('modalReq_active');
  });

  $('.realtor__button').on('click', function () {
    $('.modalConsul').addClass('modalConsul_active');
  });

  $('.modalConsul').on('click', function (e) {
    if ($(e.target).hasClass('modalConsul_active')) $(this).removeClass('modalConsul_active');
  });
  $('.modalConsul__close').on('click', function () {
    $('.modalConsul').removeClass('modalConsul_active');
  });

  let inputPhone = document.getElementById('modalReq__input_phone');
  let maskOptions = {
    mask: '+{7} (000) 000-00-00'
  };
  IMask(inputPhone, maskOptions);

  ymaps
    .load('https://api-maps.yandex.ru/2.1/?apikey=2b543523-54f1-4a9f-af8a-8333795718cd&lang=ru_RU')
    .then((maps) => {
      const myMap = new maps.Map('yandexMap', {
        center: [latitude, longitude],
        zoom: 18,
        controls: ['zoomControl']
      });

      myMap.geoObjects.add(createHint(maps, address, object, [latitude, longitude]));
    })
    .catch((error) => console.log('Failed to load Yandex Maps', error));
});
