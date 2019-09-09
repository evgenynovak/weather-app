const formInput = document.querySelector('.form__search');
const formSubmit = document.querySelector('.form__submit');
const weatherbox = document.querySelector('.weatherbox');

function checkCard(){  //проверка есть ли карточка, если есть, удаляем
  if ( document.querySelector('.weatherbox__card') ) {
    const delCard = document.querySelector('.weatherbox__card');
    delCard.remove();
  };
};

function addError(err) { // карточка ошибка
  checkCard();
  const cardError = document.createElement('div');
  cardError.className = 'weatherbox__card-title';
  cardError.innerHTML = err;

  const card = document.createElement('div');
  card.className = 'weatherbox__card';
  card.append(cardError);

  return card
};

function addCard(data) {  // карточка город с данными 

    checkCard();

    const cardTitle = document.createElement('div');
    cardTitle.className = 'weatherbox__card-title';
    cardTitle.innerHTML = data.name;

    const cardIcon = document.createElement('div');
    cardIcon.className = 'weatherbox__card-icon';
    cardIcon.style.backgroundImage = 'url(https://openweathermap.org/img/wn/'+data.weather[0]['icon']+'@2x.png)';
    cardIcon.style.backgroundRepeat = 'no-repeat';

    const cardTemp = document.createElement('div');
    cardTemp.className = 'weatherbox__card-temp';
    cardTemp.innerHTML = Math.round(data.main.temp) + '&deg;C';

    const cardCloud = document.createElement('div');
    cardCloud.className = 'weatherbox__card-cloud';
    cardCloud.innerHTML = data.weather[0]['description'];

    const cardWind = document.createElement('div');
    cardWind.className = 'weatherbox__card-wind';
    cardWind.innerHTML = 'Ветер ' + data.wind.speed + ' м/с';

    const cardBlock = document.createElement('div');
    cardBlock.className = 'weatherbox__card-block';

    const card = document.createElement('div');
    card.className = 'weatherbox__card';

    cardBlock.append(cardIcon);
    cardBlock.append(cardTemp);
    card.append(cardTitle);
    card.append(cardBlock);
    card.append(cardCloud );
    card.append(cardWind);

    return card
};

navigator.geolocation.getCurrentPosition(
  function(position) {
    const urlWithCord = 'https://api.openweathermap.org/data/2.5/weather?lat='+ position.coords.latitude +'&lon='+ position.coords.longitude +'&units=metric&lang=ru&appid=90881fcf171be6ed244c774968bee955';
    fetch(urlWithCord)
      .then(function(result){
        if (result.ok) {
          return result.json();
        } 
     })
     .then(function(data) {
      weatherbox.append(addCard(data));
    })
}
);

formSubmit.addEventListener( 'click' , (event) => {
  event.preventDefault();
  const url = 'https://api.openweathermap.org/data/2.5/weather?q='+ formInput.value +'&units=metric&lang=ru&appid=90881fcf171be6ed244c774968bee955';

  fetch(url)
  .then(function(result){
    console.log('fetch result получили ответ: ' + result.status);
    if (result.ok) {
      return result.json();
    } else if  (result.status === 404) {
      weatherbox.append(addError('Ошибка! Город не найден!'));
      throw new Error(result.status);
    } else if  (result.status === 400) {
      weatherbox.append(addError('Ошибка! Введите данные!'));
      throw new Error(result.status);
    } 
  }
  ,function(reject){  // обработка когда нет сети, fech переходит в состояние rejected только при ошибке сети
    console.log('----- в reject -----');
    weatherbox.append(addError('Ошибка! Нет сети!'));
    throw new Error(reject);
  }
  )
  .then(function(data) {
    console.log('------- в .then addCard ---------')
    weatherbox.append(addCard(data));
  })
  .catch(error => console.error('Ошибка:' + error.message));
  }//end collback
);//addEventListener


