import { priceFormatter } from "./formatters.js";
import { priceFormatterDecimals } from "./formatters.js";

const maxPrice = 100000000;
// Инпуты
const inputCost = document.querySelector('#input-cost');
const inputDownPayment = document.querySelector('#input-downpayment');
const inputTerm = document.querySelector('#input-term');

const form = document.querySelector('#form');
const totalCost = document.querySelector ('#total-cost'); 
const totalMonthPayment = document.querySelector('#total-month-payment')
// Cleave опции фарматирования
const cleavePriceSettings =  {numeral: true, numeralThousandsGroupStyle: 'thousand', delimiter: ' '};
const cleaveYears =  {numeral: true};
// Форматирование 
const cleaveCost = new Cleave(inputCost, cleavePriceSettings);
const cleaveDownPayment = new Cleave(inputDownPayment, cleavePriceSettings);
const cleaveTerm = new Cleave(inputTerm, cleavePriceSettings);

// Сумма кредита
calcMortgage();

//Отображение и рассчет суммы кредита
form.addEventListener('input', function () {
   calcMortgage();
})

function calcMortgage() {
    // Проверка чтоб стоимость недвижимости не была больше максимальной
    let cost = +cleaveCost.getRawValue();
    if (cost > maxPrice) {
        cost = maxPrice;
    }
    
    // Общая сумма по кредиту
    const totalAmount = +cleaveCost.getRawValue() - cleaveDownPayment.getRawValue();
    totalCost.innerText = priceFormatter.format(totalAmount);
    
    // Ставка по кредиту 
    const creditRate = +document.querySelector('input[name="program"]:checked').value;
    const monthRate = (creditRate *100) / 12;
    // Срок ипотеки
    const Years = +cleaveTerm.getRawValue();
    const mounths = Years * 12;
    // Рассчет ежемесячного платежа 
    const mounthPayment = (totalAmount * monthRate) / (1-(1+monthRate)*(1-mounths));
    // Отображение ежемесячного платежа
    totalMonthPayment.innerText = priceFormatterDecimals.format(mounthPayment) ;
}
// Slider Cost
const sliderCost = document.getElementById('slider-cost');

noUiSlider.create(sliderCost, {
    start: 12000000,
    connect: 'lower',
    step: 100000,
    tooltips: true,
    range: {
        'min': 0,
        '50%': [10000000, 1000000],
        
        'max': 100000000
    },
    format: wNumb({
        decimals:0,
        thousand: '',
        suffix: '',
    }),

    
});

sliderCost.noUiSlider.on('slide', function(){
    const sliderValue = parseInt(sliderCost.noUiSlider.get(true));
    cleaveCost.setRawValue(sliderValue);
    calcMortgage();
});

// Slider DownPayment

const sliderDownpayment = document.getElementById('slider-downpayment');

noUiSlider.create(sliderDownpayment, {
    start: 6000000,
    connect: 'lower',
    step: 100000,
    tooltips: true,
    range: {
        'min': 0,
        'max': 10000000
    },
    format: wNumb({
        decimals:0,
        thousand: '',
        suffix: '',
    }),

    
});

sliderDownpayment.noUiSlider.on('slide', function(){
    const sliderValue = parseInt(sliderDownpayment.noUiSlider.get(true));
    cleaveDownPayment.setRawValue(sliderValue);
    calcMortgage();
});

// Slider Years

const sliderTerm = document.getElementById('slider-term');

noUiSlider.create(sliderTerm, {
    start: 1,
    connect: 'lower',
    step: 1,
    tooltips: true,
    range: {
        'min': 0,
        'max': 30
    },
    format: wNumb({
        decimals:0,
        thousand: '',
        suffix: '',
    }),

    
});

sliderTerm.noUiSlider.on('slide', function(){
    const sliderValue = parseInt(sliderTerm.noUiSlider.get(true));
    cleaveTerm.setRawValue(sliderValue);
    calcMortgage();
});

// Формирование InputCost
inputCost.addEventListener('input', function() {
    const value = +cleaveCost.getRawValue ();
    // Обновляем range slider
    sliderCost.noUiSlider.set(value);

    // Проверка на максимальную цену 
    if (value > maxPrice) inputCost.closest('.param__details').classList.add('param__details--error');
    if (value <= maxPrice) inputCost.closest('.param__details').classList.remove('param__details--error');
        
    // Зависимость значений downpayment от input cost
    const percentMin = value * 0.15;
    const percentMax = value * 0.90;

    sliderDownpayment.noUiSlider.updateOptions({
        range: {
            min: percentMin,
            max: percentMax,
        }
    });


})

inputCost.addEventListener('change', function() {
    const value = +cleaveCost.getRawValue ();
    
    if (value > maxPrice) {
        inputCost.closest('.param__details').classList.remove('param__details--error');
        cleaveCost.setRawValue(maxPrice);
    }
  
})