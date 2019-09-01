let form = document.forms.wform;
let search = form.elements.search;
let submit = form.elements.submit;
const urlTest = 'http://api.openweathermap.org/data/2.5/weather?q=London&appid=90881fcf171be6ed244c774968bee955';


let promise = new Promise(function(resolve, reject) {
  submit.addEventListener( 
                          "click" , () => resolve('http://api.openweathermap.org/data/2.5/weather?q='
                          +search.value+
                          '&appid=90881fcf171be6ed244c774968bee955'))

});

promise.then(result => fetch(result))
         .then(response => response.json())
         .then(data => console.log(data))
         .catch(err => {
          return console.error(err);
          });


// нажимаем на кнопку , берем значение из инпута
// в url запроса подставляем значение инпута
// делаем запрос на сервер
// получаем данные
// подставляем данные в карточку




