/* eslint-disable no-inner-declarations */
import * as $ from 'jquery';
import '@fancyapps/ui';
import '@fancyapps/ui/dist/fancybox.css';

import IMask from 'imask';
import { filterObjects } from './ajax.js';

export function select(btn, content, activeClass) {
  $(btn).on('click', function (e) {
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

export function addNulles(str) {
  let arr = [...str];
  for (let i = str.length; i >= 0; i -= 3) {
    if (i !== str.length && str.length !== 3) arr.splice(i, 0, ' ');
  }
  return arr.join('');
}

// +7 937 021-23-06
export function strToPhone(str) {
  let array = [...str];
  array.splice(2, 0, ' ');
  array.splice(6, 0, ' ');
  array.splice(10, 0, '-');
  array.splice(13, 0, '-');

  return array.join('');
}

export function transformText(classElement, callback) {
  $(`${classElement}`).each((_, item) => {
    let val = $(item).text();
    $(item).text(callback(val));
  });
}

// Заполнение инпута
let reqPhone = document.getElementById('modalReq__input_phone');
let consulPhone = document.getElementById('modalConsul__input_phone');

let maskOptions = {
  mask: '+{7} (000) 000-00-00'
};

if (reqPhone) IMask(reqPhone, maskOptions);
if (consulPhone) IMask(consulPhone, maskOptions);

transformText('.flat__price', addNulles);
transformText('.card__newPrice', addNulles);
transformText('.card__oldPrice', addNulles);
transformText('.object__price', addNulles);
transformText('.realtor__phone', strToPhone);

export function reqModal(trigger) {
  $(trigger).on('click', function () {
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

  $('.modalEmailSuccess__close').on('click', function () {
    $('.modalEmailSuccess').removeClass('modalEmailSuccess_active');
  });
  $('.modalEmailFailed__close').on('click', function () {
    $('.modalEmailFailed').removeClass('modalEmailFailed_active');
  });
}

export function consulModal(trigger) {
  $(trigger).on('click', function () {
    $('.modalConsul').addClass('modalConsul_active');
  });

  $('.modalConsul').on('click', function (e) {
    if ($(e.target).hasClass('modalConsul_active')) $(this).removeClass('modalConsul_active');
  });
  $('.modalConsul__close').on('click', function () {
    $('.modalConsul').removeClass('modalConsul_active');
  });

  $('.modalEmailSuccess__close').on('click', function () {
    $('.modalEmailSuccess').removeClass('modalEmailSuccess_active');
  });
  $('.modalEmailFailed__close').on('click', function () {
    $('.modalEmailFailed').removeClass('modalEmailFailed_active');
  });
}

function fillFavoriteColor() {
  $('.flat__favorites').each(function (index, button) {
    console.log('its work');
    let favoriteArr = [];
    if (localStorage.getItem('favorite')) {
      favoriteArr = localStorage.getItem('favorite').split(',');
      favoriteArr.forEach((id) => {
        if (id === button.name) {
          $(button).css('border-color', '#e23d3d');
          $(button).find('path').css('fill', '#e23d3d');
        }
      });
    }
  });
}
fillFavoriteColor();

$('.flat__favorites').on('click', function (e) {
  e.preventDefault();
  if (!localStorage.getItem('favorite')) {
    localStorage.setItem('favorite', `${this.name}`);
    fillFavoriteColor();
  } else {
    let favoriteArr = localStorage.getItem('favorite').split(',');
    if (!favoriteArr.includes(this.name)) favoriteArr.push(this.name);
    let str = favoriteArr.join(',');
    localStorage.setItem('favorite', str);
    fillFavoriteColor();
  }
});

$('.object__button--favorite').on('click', function (e) {
  e.preventDefault();
  if (!localStorage.getItem('favorite')) localStorage.setItem('favorite', `${this.name}`);
  else {
    let favoriteArr = localStorage.getItem('favorite').split(',');
    if (!favoriteArr.includes(this.name)) favoriteArr.push(this.name);
    let str = favoriteArr.join(',');
    localStorage.setItem('favorite', str);
  }
});

$('.header__favorites').on('click', function (e) {
  let favorite = localStorage.getItem('favorite');
  document.cookie = `favorite=${favorite}; path=/izbrannoe`;
});

document.addEventListener('DOMContentLoaded', function () {
  var lazyloadImages;

  if ('IntersectionObserver' in window) {
    lazyloadImages = document.querySelectorAll('.lazy');
    var imageObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var image = entry.target;
          image.src = image.dataset.src;
          image.classList.remove('lazy');
          imageObserver.unobserve(image);
        }
      });
    });

    lazyloadImages.forEach(function (image) {
      imageObserver.observe(image);
    });
  } else {
    var lazyloadThrottleTimeout;
    lazyloadImages = document.querySelectorAll('.lazy');

    function lazyload() {
      if (lazyloadThrottleTimeout) {
        clearTimeout(lazyloadThrottleTimeout);
      }

      lazyloadThrottleTimeout = setTimeout(function () {
        var scrollTop = window.pageYOffset;
        lazyloadImages.forEach(function (img) {
          if (img.offsetTop < window.innerHeight + scrollTop) {
            img.src = img.dataset.src;
            img.classList.remove('lazy');
          }
        });
        if (lazyloadImages.length == 0) {
          document.removeEventListener('scroll', lazyload);
          window.removeEventListener('resize', lazyload);
          window.removeEventListener('orientationChange', lazyload);
        }
      }, 20);
    }

    document.addEventListener('scroll', lazyload);
    window.addEventListener('resize', lazyload);
    window.addEventListener('orientationChange', lazyload);
  }
});

let location = window.location.search;
let params = new URLSearchParams(location);

export const filter = new filterObjects();

if (params.get('parents')) {
  $('.filters__category').each(function (_, button) {
    if (params.get('parents') === button.name)
      $(button).css('background-color', '#e23d3d').css('color', '#fff');
  });
}
if (params.get('squareFrom')) {
  $('.filter__squareFrom').val(params.get('squareFrom'));
  filter.setAttr('squareFrom', params.get('squareFrom'));
}
if (params.get('squareTo')) {
  $('.filter__squareTo').val(params.get('squareTo'));
  filter.setAttr('squareTo', params.get('squareTo'));
}
if (params.get('priceFrom')) {
  $('.filter__priceFrom').val(params.get('priceFrom'));
  filter.setAttr('priceFrom', params.get('priceFrom'));
}
if (params.get('priceTo')) {
  $('.filter__priceTo').val(params.get('priceTo'));
  filter.setAttr('priceTo', params.get('priceTo'));
}

if (params.get('flatRooms')) {
  $('.filter__text_rooms').text(`Кол-во комнат: ${params.get('flatRooms')}`);
  filter.setAttr('flatRooms', params.get('flatRooms'));
}

if (params.get('flatBuildingType')) {
  $('.filter__text_walls').text(params.get('flatBuildingType'));
  filter.setAttr('flatBuildingType', params.get('flatBuildingType'));
}

if (params.get('flatAddress')) {
  let address = params.get('flatAddress').replace(/%20/g, ' ');
  $('.filter__item_city').val(address);
  filter.setAttr('flatAddress', address);
}

if (params.get('sortby') === 'flatPrice' && params.get('sortdir') === 'desc') {
  $('.content__newText').text('Цена (по убыванию)');
  $('.flats__text').text('Цена (по убыванию)');
  filter.setAttr('dir', 'flatPrice');
  filter.setAttr('sort', 'desc');
}
if (params.get('sortby') === 'flatPrice' && params.get('sortdir') === 'asc') {
  $('.content__newText').text('Цена (по возрастанию)');
  $('.flats__text').text('Цена (по возрастанию)');
  filter.setAttr('dir', 'flatPrice');
  filter.setAttr('sort', 'asc');
}
if (params.get('sortby') === 'flatSquare' && params.get('sortdir') === 'desc') {
  $('.content__newText').text('Цена (по убыванию)');
  $('.flats__text').text('Цена (по убыванию)');
  filter.setAttr('dir', 'flatSquare');
  filter.setAttr('sort', 'desc');
}
if (params.get('sortby') === 'flatSquare' && params.get('sortdir') === 'asc') {
  $('.content__newText').text('Площадь (по возрастанию)');
  $('.flats__text').text('Площадь (по возрастанию)');
  filter.setAttr('dir', 'flatSquare');
  filter.setAttr('sort', 'asc');
}

const svgClose = `<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.05029 1.0498L10.9498 10.9493" stroke="#E23D3D" stroke-width="1.24365"/>
<path d="M10.9497 1.0498L1.05021 10.9493" stroke="#E23D3D" stroke-width="1.24365"/>
</svg>
`;
const svgOpen = `<svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0 1H14" stroke="#E23D3D" stroke-width="1.24365"/>
<path d="M0 6H14" stroke="#E23D3D" stroke-width="1.24365"/>
<path d="M0 11H14" stroke="#E23D3D" stroke-width="1.24365"/>
</svg>
`;

setTimeout(() => {
  $('.header__mobile').on('click', function () {
    $('.menuMobile').toggleClass('menuMobile__active');

    if ($('.menuMobile').hasClass('menuMobile__active')) {
      $('.header__mobile').html(svgClose);
    } else $('.header__mobile').html(svgOpen);
  });
  consulModal('.navMobile__consul');
}, 3000);
