export function createHint(maps, address, object, coorArr, link) {
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

  // myPlacemark.events.add('click', function () {
  //   console.log(link);
  // });

  return myPlacemark;
}
