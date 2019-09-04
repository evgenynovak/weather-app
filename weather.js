const formInput = document.querySelector('.form__search');
const formSubmit = document.querySelector('.form__submit');
const card = document.querySelector('.weatherbox__card');

const urlTest = 'http://api.openweathermap.org/data/2.5/weather?q=London&appid=90881fcf171be6ed244c774968bee955';

formSubmit.addEventListener( "click" , () => {
  event.preventDefault();
  url = 'http://api.openweathermap.org/data/2.5/weather?q='+ formInput.value +'&units=metric&lang=ru&appid=90881fcf171be6ed244c774968bee955';

  fetch(url)
  .then(function(result){
    if (result.ok) {
      return result.json();
    }
  })
  .then( function(data){
    
    let cardTitle = document.createElement('div');
    cardTitle.className = "weatherbox__card-title";
    cardTitle.innerHTML = data.name;
    card.append(cardTitle);

    let cardTemp = document.createElement('div');
    cardTemp.className = "weatherbox__card-temp";
    cardTemp.innerHTML = data.main.temp;
    card.append(cardTemp);

    let cardCloud = document.createElement('div');
    cardCloud.className = "weatherbox__card-cloud";
    cardCloud.innerHTML = data.weather[0]['description'];
    card.append(cardCloud);

    let cardWind = document.createElement('div');
    cardWind.className = "weatherbox__card-wind";
    cardWind.innerHTML = data.wind.speed;
    card.append(cardWind);

  })
  }//end collback
);//addEventListener


