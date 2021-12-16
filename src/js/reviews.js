import '../scss/reviews.scss';

import * as $ from 'jquery';
import '../vendors/script.js';

import { consulModal, select } from '../vendors/script.js';

// import header from '../components/header.html';
// import footer from '../components/footer.html';

$(() => {
  // $('#root').prepend(header);
  // $('#root').append(footer);

  consulModal('.intro__button');

  select('.nav__item_button', '.nav__options', 'nav__active');
  select('.filter__item_select', '.filter__options', 'filter__item_active');

  select('.reviews__view', '.reviews__options', 'reviews__active');
  select('.reviews__sort', '.reviews__options', 'reviews__active');

  $('.reviews__count').text(`Всего отзывов: ${$('.review').length}`);
});
