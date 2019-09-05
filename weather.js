const formInput = document.querySelector('.form__search');
const formSubmit = document.querySelector('.form__submit');
const weatherbox = document.querySelector('.weatherbox');
const urlTest = 'http://api.openweathermap.org/data/2.5/weather?q=London&appid=90881fcf171be6ed244c774968bee955';

function addCard(data) {

    const cardTitle = document.createElement('div');
    cardTitle.className = "weatherbox__card-title";
    cardTitle.innerHTML = data.name;

    const cardTemp = document.createElement('div');
    cardTemp.className = "weatherbox__card-temp";
    cardTemp.innerHTML = data.main.temp + ' &deg;C';

    const cardCloud = document.createElement('div');
    cardCloud.className = "weatherbox__card-cloud";
    cardCloud.innerHTML = data.weather[0]['description'];

    const cardWind = document.createElement('div');
    cardWind.className = "weatherbox__card-wind";
    cardWind.innerHTML = 'Ветер ' + data.wind.speed + ' м/с';

    const card = document.createElement('div');
    card.className = "weatherbox__card";
    card.append(cardTitle);
    card.append(cardTemp);
    card.append(cardCloud );
    card.append(cardWind);

    return card;
};


formSubmit.addEventListener( "click" , (event) => {
  event.preventDefault();
  url = 'http://api.openweathermap.org/data/2.5/weather?q='+ formInput.value +'&units=metric&lang=ru&appid=90881fcf171be6ed244c774968bee955';

  fetch(url)
  .then(function(result){
    if (result.ok) {
      return result.json();
    } else {

    }
  })
  .then( function(data){
    if ( document.querySelector('.weatherbox__card') ) {
      const delCard = document.querySelector('.weatherbox__card');
      delCard.remove();
    };
    weatherbox.append(addCard(data));
  })
  }//end collback
);//addEventListener


