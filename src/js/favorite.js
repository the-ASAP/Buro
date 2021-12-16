// import header from '../components/header.html';
// import footer from '../components/footer.html';

import * as $ from 'jquery';
import '../vendors/script.js';
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

  $('.object__favorite').on('click', function () {
    let favorite = localStorage.getItem('favorite').split(',');
    let newFavorite = favorite.filter((id) => id !== this.name).join(',');
    localStorage.setItem('favorite', newFavorite);
    document.cookie = `favorite=${newFavorite}; path=/izbrannoe`;
    $(this).closest('.object').remove();
  });
});
