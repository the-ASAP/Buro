import * as $ from 'jquery';
import '../scss/reviews.scss';
import '../vendors/script.js';
import { select } from '../vendors/script.js';

// import header from '../components/header.html';
// import footer from '../components/footer.html';

$(() => {
  // $('#root').prepend(header);
  // $('#root').append(footer);

  select('.nav__item_button', '.nav__options', 'nav__active');
  select('.filter__item_select', '.filter__options', 'filter__item_active');

  select('.reviews__view', '.reviews__options', 'reviews__active');
  select('.reviews__sort', '.reviews__options', 'reviews__active');
});
