// import header from '../components/header.html';
// import footer from '../components/footer.html';

import * as $ from 'jquery';
import { select } from '../vendors/script.js';
import { owlGallery } from '../vendors/owlGallery.js';

import '../scss/favorite.scss';

$(() => {
  // $('#root').prepend(header);
  // $('#root').append(footer);

  select('.nav__item_button', '.nav__options', 'nav__active');
  select('.filter__item_select', '.filter__options', 'filter__item_active');

  owlGallery('.carouselFlatPhotos', {
    dots: true,
    autoWidth: false,
    items: 1,
    margin: 16,
    loop: false
  });
});
