import * as $ from 'jquery';
import '../scss/contacts.scss';
import ymaps from 'ymaps';
import { consulModal } from '../vendors/script.js';
import { createHint } from '../vendors/map.js';
import '../vendors/script.js';

// import header from '../components/header.html';
// import footer from '../components/footer.html';

$(() => {
  // $('#root').prepend(header);
  // $('.contacts').append(footer);

  consulModal('.contacts__consul');

  ymaps
    .load('https://api-maps.yandex.ru/2.1/?apikey=2b543523-54f1-4a9f-af8a-8333795718cd&lang=ru_RU')
    .then((maps) => {
      const myMap = new maps.Map('yandexMap', {
        center: [51.544542, 43.149542],
        zoom: 14,
        controls: ['zoomControl']
      });

      myMap.geoObjects.add(
        createHint(
          maps,
          'Балашов, ул. К. Маркса, 40 "Б"',
          'Бюро недвижимости',
          [51.544542, 43.149542]
        )
      );
    })
    .catch((error) => console.log('Failed to load Yandex Maps', error));
});
