import * as $ from 'jquery';
import '@fancyapps/ui';
import '@fancyapps/ui/dist/fancybox.css';

import IMask from 'imask';

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

transformText('.flat__price', addNulles);
transformText('.card__newPrice', addNulles);
transformText('.card__oldPrice', addNulles);
transformText('.realtor__phone', strToPhone);

// Заполнение инпута
let reqPhone = document.getElementById('modalReq__input_phone');
let consulPhone = document.getElementById('modalConsul__input_phone');

let maskOptions = {
  mask: '+{7} (000) 000-00-00'
};

if (reqPhone) IMask(reqPhone, maskOptions);
if (consulPhone) IMask(consulPhone, maskOptions);

// $('.filter__map').on('click', function () {
//   let url = `http://buro.asap-lp.ru/obektyi?parents=7`;
//   fetch(url, {
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   });
// });
