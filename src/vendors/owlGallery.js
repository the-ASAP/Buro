import * as $ from 'jquery';
import 'owl.carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';

export const owlGallery = (selector, params) => {
  const arrow = ` <svg width="7" height="10" viewBox="0 0 7 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M5.50024 10.0002C5.75624 10.0002 6.01224 9.90225 6.20724 9.70725C6.59824 9.31625 6.59824 8.68425 6.20724 8.29325L2.90224 4.98825L6.08224 1.69525C6.46524 1.29725 6.45424 0.664249 6.05724 0.281249C5.65924 -0.101751 5.02624 -0.090751 4.64324 0.305249L0.781238 4.30525C0.402238 4.69825 0.407238 5.32125 0.793238 5.70725L4.79324 9.70725C4.98824 9.90225 5.24424 10.0002 5.50024 10.0002Z" fill="#3D3D3D"/>
                    </svg>`;
  if (params == undefined) params = '';
  const owl = $(selector);
  owl
    .each((i, el) => {
      $(el)
        .addClass('owl-carousel owl-theme')
        .owlCarousel(
          Object.assign(params, {
            lazyLoad: true,
            smartSpeed: 1000,
            navText: [arrow, arrow]
          })
        );
    })
    .trigger('refresh.owl.carousel');

  if (document.documentElement.clientWidth > 768) {
    $('.owl-dot').mouseenter(function () {
      if (!$(this).hasClass('active')) $(this).trigger('click');
    });

    $('.owl-dot').on('click', function () {
      if ($(this).hasClass('active')) {
        let ref = $(this).parents('.flat').find('.flat__desc').attr('href');
        let favoriteRef = $(this).parents('.object').find('.object__more').attr('href');
        // window.location.href = ref;
        if (ref) window.location.href = ref;
        else window.location.href = favoriteRef;
      }
    });
  }
};
