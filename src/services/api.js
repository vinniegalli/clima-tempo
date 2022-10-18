export function getUserPosition(){
  let url;
  // const cidade = document.querySelector('.city-value').value;
  let dados = `https://nominatim.openstreetmap.org/?addressdetails=1&q=londres&format=json&limit=1`

  console.log(dados.JSON())

  navigator.geolocation.getCurrentPosition((pos) =>{
    let lat = pos.coords.latitude;
    let long = pos.coords.longitude;
    url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=imperial&APPID=632e6d609944d6dfae45d1740b8ff66e`;
    fetchApi(url)
  })
}

function fetchApi(url) {
  let city = document.querySelector('.cidade');
  let temp = document.querySelector('.temperatura');
  let climate = document.querySelector('.clima')
  fetch(url)
  .then((data) => {
    return data.json();
  })
  .then((data) => {
    let tempInCelsius = ((5/9) * (data.main.temp-32)).toFixed(1);
    let clima = data.weather;
    city.innerText = data.name;
    temp.innerText = tempInCelsius;
    climate.innerText = clima[0].icon;
  })
  .catch((err) => {
    city.innerText = `Impossível acessar o OpenWeather. Verifique a sua conexão.`;
    temp.innerText = `-`;
  })
}

getUserPosition();