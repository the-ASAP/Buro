import * as $ from 'jquery';

export function createHint(maps, address, object, coorArr, link, id) {
  let myPlacemark = new maps.Placemark(
    [coorArr[0], coorArr[1]],
    {
      address,
      object,
      link,
      balloonContentHeader: object,
      balloonContentBody: address,
      balloonContentFooter: link
        ? `<a href=${link} class="yandexMap__hint">` + 'Перейти' + '</a>'
        : ''
    },
    {
      // hintLayout: HintLayout,
      iconColor: '#e23d3d'
    }
  );

  if (id) {
    myPlacemark.events.add('click', function () {
      $('.flats__choice').animate(
        {
          scrollLeft: $(`#${id}`).offset().left + 'px'
        },
        {
          duration: 750,
          easing: 'swing'
        }
      );
      return false;
    });
  }

  myPlacemark.events.add('balloonclose', function () {
    if (document.documentElement.clientWidth < 768 && id) {
      $('.flats').css('bottom', '-100%');
    }
  });
  myPlacemark.events.add('balloonopen', function () {
    if (document.documentElement.clientWidth < 768 && id) {
      $('.flats').css('bottom', '0');
    }
  });

  return myPlacemark;
}
