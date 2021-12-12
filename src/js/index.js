//styles
import '../scss/index.scss';

//libraries
import * as $ from 'jquery';
import ymaps from 'ymaps';
import '../vendors/mortgageCalc.js';
import '../vendors/script.js';

import { select, reqModal, consulModal, openModal } from '../vendors/script.js';
import { owlGallery } from '../vendors/owlGallery.js';
import { createHint } from '../vendors/map.js';
import { filterObjects } from '../vendors/ajax';

//Components
import header from '../components/header.html';
// import footer from '../components/footer.html';

$(() => {
  $('#root').prepend(header);
  // $('.contacts').append(footer);

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

  select('.nav__item_button', '.nav__options', 'nav__active');
  select('.filter__item_select', '.filter__options', 'filter__item_active');

  reqModal('.total__button');
  consulModal('.contacts__consul');
  consulModal('.exchange__mainButton');
  consulModal('.exchange__button');
  // openModal('.agency__ref', '.modalDomClick', 'modalDomClick_active');
  // consulModal('.card__openConsul');

  $('.agency__ref').on('click', function (e) {
    e.preventDefault();
    $('.modalDomClick__image').trigger('click');
  });

  $('.card__openConsul').on('click', function () {
    window.open('http://buro.asap-lp.ru/obektyi');
  });

  ymaps
    .load('https://api-maps.yandex.ru/2.1/?apikey=2b543523-54f1-4a9f-af8a-8333795718cd&lang=ru_RU')
    .then((maps) => {
      const myMap = new maps.Map('yandexMap', {
        center: [51.544542, 43.149542],
        zoom: 18,
        controls: ['zoomControl']
      });

      myMap.geoObjects.add(
        createHint(
          maps,
          'Балашов, ул. К. Маркса, 40 "Б"',
          'Бюро недвижимости',
          [51.544542, 43.149542]
        )
      );

      new maps.SuggestView('search');
    })
    .catch((error) => console.log('Failed to load Yandex Maps', error));

  const filter = new filterObjects();
  $('.filter__tab').on('click', function (e) {
    filter.setAttr('parent', e.target.name);
    filter.filterListPage();
  });
  $('.filter__item_input').on('change', function () {
    filter.setAttr('squareFrom', Number(this.value) * 0.8);
    filter.setAttr('squareTo', Number(this.value) * 1.2);
  });
  $('.filter__priceFrom').on('change', function () {
    filter.setAttr('priceFrom', this.value);
  });
  $('.filter__priceTo').on('change', function () {
    filter.setAttr('priceTo', this.value);
  });
  $('.filter__item_city').on('change', function () {
    filter.setAttr('address', this.value);
  });
  $('.filter__map').on('click', function () {
    filter.filterCartPage();
  });
  $('.filter__list').on('click', function () {
    filter.filterListPage();
  });
  $('.filter__room').on('click', function () {
    $('.filter__room').each((index, item) => {
      $(item).removeClass('filter__room_active');
    });
    $(this).addClass('filter__room_active');

    let text = $(this).text();
    if (text === '4+') filter.setAttr('flatRooms', `>=4`);
    else filter.setAttr('flatRooms', `=${text}`);
  });
  $('.filter__item_walls').on('click', function () {
    let text = $(this).text();
    filter.setAttr('flatBuildingType', `'${text}'`);
  });
  $('.filter__option').on('click', function () {
    let text = $(this).text();
    $(this).parent().prev().text(text);
  });
});
