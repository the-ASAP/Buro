export function createHint(maps, address, object, coorArr, link) {
  let HintLayout = maps.templateLayoutFactory.createClass(
    '<div class="yandexHint">' +
      '<p>{{ properties.object }}</p>' +
      '<p>{{ properties.address }}</p>' +
      '</div>',
    {
      getShape: function () {
        var el = this.getElement(),
          result = null;
        if (el) {
          var firstChild = el.firstChild;
          result = new maps.shape.Rectangle(
            new maps.geometry.pixel.Rectangle([
              [0, 0],
              [firstChild.offsetWidth, firstChild.offsetHeight]
            ])
          );
        }
        return result;
      }
    }
  );

  let myPlacemark = new maps.Placemark(
    [coorArr[0], coorArr[1]],
    {
      address,
      object,
      link
    },
    {
      hintLayout: HintLayout
    }
  );

  myPlacemark.events.add('click', function (e) {
    let link = e.get('target')['properties'].get('link');
    if (link) window.location.href = link;
  });

  return myPlacemark;
}
