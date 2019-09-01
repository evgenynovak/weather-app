const form = document.forms.wform;
const search = form.elements.search;
const submit = form.elements.submit;
const cardTitle = document.getElementById('card-title');
const cardTemp = document.getElementById('card-temp');
const cardCloud = document.getElementById('card-cloud');
const cardWind = document.getElementById('card-wind');
const urlTest = 'http://api.openweathermap.org/data/2.5/weather?q=London&appid=90881fcf171be6ed244c774968bee955';

submit.addEventListener( "click" , () => {
   event.preventDefault();
   let cityName = search.value;
   let units = 'metric';
   const APPID = '90881fcf171be6ed244c774968bee955';
   let url = new URL('http://api.openweathermap.org/data/2.5/weather');
   url.searchParams.set('q', cityName);
   url.searchParams.set('units', units);
   url.searchParams.set('appid', APPID);

   let xhr = new XMLHttpRequest();
   xhr.open('GET', url);
   xhr.responseType = 'json';
   xhr.send();

   xhr.onload = function() {
    if (xhr.status != 200) { 
      alert( 'Ошибка: ' + xhr.status);
      return;
    }
    let responseObj = xhr.response;
    cardTitle.innerHTML = responseObj.name;
    cardTemp.innerHTML =  responseObj.main.temp + ' &deg;C';
    cardCloud.innerHTML = responseObj.weather[0]['description'];
    cardWind.innerHTML = responseObj.wind.speed + ' m/s';
  };
  
  xhr.onprogress = function(event) {
    //прогресс
  };

  xhr.onerror = function() {
    alert("Запрос не удался");
  };
   
});



