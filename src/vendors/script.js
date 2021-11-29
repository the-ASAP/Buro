import * as $ from 'jquery';
import '@fancyapps/ui';
import '@fancyapps/ui/dist/fancybox.css';

import IMask from 'imask';

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
}
