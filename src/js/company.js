import '../scss/company.scss';

// import header from '../components/header.html';
// import footer from '../components/footer.html';

import * as $ from 'jquery';
import '../vendors/script.js';
import { select, consulModal } from '../vendors/script.js';

$(() => {
  // $('#root').prepend(header);
  // $('#root').append(footer);

  select('.nav__item_button', '.nav__options', 'nav__active');
  select('.filter__item_select', '.filter__options', 'filter__item_active');

  consulModal('.consul__button');
});
