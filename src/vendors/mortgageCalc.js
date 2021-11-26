import * as $ from 'jquery';

const numberWithSpaces = (x) => {
  if (x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  } else return 0;
};

const calcTotalSum = () => {
  let price = Number($('input[name="rangePrice"]').val());
  let contribution = Number($('input[name="rangeContribution"]').val());
  let time = Number($('input[name="rangeTime"]').val());

  //Ипотека под 20%
  let totalSum = Math.trunc((price * 1.2 - contribution) / (time * 12));

  if (totalSum < 0) totalSum = 0;

  $('.total__price').html(`от ${numberWithSpaces(totalSum)} &#8381;/мес`);
};

$(() => {
  $('.mortgageCalc__input').on('input', function () {
    let value = ((this.value - this.min) / (this.max - this.min)) * 100;

    if (this.name === 'rangePrice') {
      $(this).prev().html(numberWithSpaces(this.value));

      let price = Number($('input[name="rangePrice"]').val());
      let contribution = Number($('input[name="rangeContribution"]').val());
      if (contribution > price) {
        $('input[name="rangeContribution"]')
          .val(price)
          .css(
            'background',
            `linear-gradient(to right, #E23D3D 0%, #E23D3D ${value}%, #f0f0f0 ${value}%, #f0f0f0 100%`
          )
          .prev()
          .html(`${numberWithSpaces(this.value)}`);
      }
    }

    if (this.name === 'rangeTime') {
      const arrYearsMulti = [3, 4, 22, 23, 24];
      const arrYearsSimple = [21];
      let mainWord = 'лет';
      if (arrYearsMulti.includes(Number(this.value))) mainWord = 'года';
      if (arrYearsSimple.includes(Number(this.value))) mainWord = 'год';
      $(this)
        .prev()
        .html(`${numberWithSpaces(this.value)} ${mainWord}`);
    }

    if (this.name === 'rangeContribution') {
      let price = Number($('input[name="rangePrice"]').val());
      let contribution = Number($('input[name="rangeContribution"]').val());
      if (contribution > price) {
        $(this).prop('disabled', true);
        $(this).val(price);
        value = ((price - this.min) / (this.max - this.min)) * 100;
      }
      $(this).prev().html(numberWithSpaces(this.value));
    }

    $(this).css(
      'background',
      `linear-gradient(to right, #E23D3D 0%, #E23D3D ${value}%, #f0f0f0 ${value}%, #f0f0f0 100%`
    );

    calcTotalSum();
  });

  $('.mortgageCalc__block').on('mousemove', () => {
    $('#rangeContribution').removeAttr('disabled');
  });
});
