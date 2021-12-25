import * as $ from 'jquery';
import '../scss/invite.scss';
  // import header from '../components/header.html';

import '../vendors/script.js';
import { select, consulModal } from '../vendors/script.js';

  $(() => {
    // $('#root').prepend(header);

    select('.nav__item_button', '.nav__options', 'nav__active');
    select('.filter__item_select', '.filter__options', 'filter__item_active');
    consulModal('.invite__button');
  });