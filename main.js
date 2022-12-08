// Oбъект с курсами 3-х валют
const rates = {};

// Элементы для отображения курса валют
// Находим div который отвечает за предостовление USD
const elementUSD = document.querySelector('[data-value="USD"]');
// Находим div который отвечает за предостовление EUR
const elementEUR = document.querySelector('[data-value="EUR"]');
// Находим div который отвечает за предостовление SEK
//const elementSEK = document.querySelector('[data-value="SEK"]');

// Элементы формы, ввод суммы, выбор валюты, поле с результатом 
const input = document.querySelector('#input');
const result = document.querySelector('#result');
//const select = document.querySelector('#select');

getCurrencies();

// Функция получение актуальных данных валют и отображение их на странице 
async function getCurrencies() {
	const response = await fetch('https://www.cbr-xml-daily.ru/daily_json.js');
	// json превращаем в js объект
	const data = await response.json();
	// достаём из промиса js объект с которым будем работать 
	const result = await data;


	rates.USD = result.Valute.USD;
	rates.EUR = result.Valute.EUR;
//	rates.SEK = result.Valute.SEK;
	console.log(rates);

	elementUSD.textContent = rates.USD.Value.toFixed(2);
	elementEUR.textContent = rates.EUR.Value.toFixed(2);
//	elementSEK.textContent = rates.SEK.Value.toFixed(2);

	// Цвет для информера USD
	if (rates.USD.Value > rates.USD.Previous) {
		elementUSD.classList.add('top');
	} else {
		elementUSD.classList.add('bottom');
	}

	// Цвет для информера EUR
	if (rates.EUR.Value > rates.EUR.Previous) {
		elementEUR.classList.add('top');
	} else {
		elementEUR.classList.add('bottom');
	}

	// Цвет для информера SEK
	if (rates.SEK.Value > rates.SEK.Previous) {
		elementSEK.classList.add('top');
	} else {
		elementSEK.classList.add('bottom');
	}

}

//Получение курса и отображение их на странице
input.oninput = convertValue;
select.oninput = convertValue;

//Функция конвертации
/* function convertValue() {
	if ( rates[select_entry.value].Value = rates.SEK.Value){
		result.value = (((parseFloat(input.value) * rates[select_entry.value].Value) / rates[select.value].Value).toFixed(2))/10;
	}else{
		result.value = ((parseFloat(input.value) * rates[select_entry.value].Value) / rates[select.value].Value).toFixed(2);
	}
}
*/ 

function convertValue() {
	result.value = ((parseFloat(input.value) * rates[select_entry.value].Value) / rates[select.value].Value).toFixed(2);
}