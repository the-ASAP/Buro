//styles
import '../scss/catalogList.scss';

//libraries
import * as $ from 'jquery';
import ymaps from 'ymaps';
import '../vendors/mortgageCalc.js';
import '../vendors/script.js';

import { select } from '../vendors/script.js';
import { owlGallery } from '../vendors/owlGallery.js';
import { createHint } from '../vendors/map.js';
import { filterObjects } from '../vendors/ajax';

//Components
// import header from '../components/header.html';
// import footer from "../components/footer.html";

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

      new maps.SuggestView('search');
    })
    .catch((error) => console.log('Failed to load Yandex Maps', error));

  const filter = new filterObjects();
  $('.filters__category').on('click', function (e) {
    filter.setAttr('parent', e.target.name);
  });
  $('.filter__item_input').on('change', function () {
    filter.setAttr('squareFrom', this.value);
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
  $('.filter__item_rooms').on('click', function (e) {
    let text = $(this).text();
    $(this).parent().prev().text(text);
    filter.setAttr('flatRooms', text);
  });

  $('.filter__item_walls').on('click', function (e) {
    let text = $(this).text();
    $(this).parent().prev().text(text);
    filter.setAttr('flatBuildingType', text);
  });

  $('.priceDESC').on('click', function () {
    filter.setAttr('dir', 'flatPrice');
    filter.setAttr('sort', 'desc');
  });
  $('.priceASC').on('click', function () {
    filter.setAttr('dir', 'flatPrice');
    filter.setAttr('sort', 'asc');
  });
  $('.squareDESC').on('click', function () {
    filter.setAttr('dir', 'flatSquare');
    filter.setAttr('sort', 'desc');
  });
  $('.squareASC').on('click', function () {
    filter.setAttr('dir', 'flatSquare');
    filter.setAttr('sort', 'desc');
  });

  $('.filter__item_rooms').on('click', function (e) {
    let text = $(this).text();
    filter.setAttr('flatRooms', text);
  });

  $('.filter__item_walls').on('click', function (e) {
    let text = $(this).text();
    filter.setAttr('flatBuildingType', text);
  });

  $('.filter__option').on('click', function () {
    let text = $(this).text();
    $(this).parent().prev().text(text);
  });
  $('.flats__option').on('click', function (e) {
    let text = $(this).text();
    $(this).parent().prev().text(text);
  });
});
