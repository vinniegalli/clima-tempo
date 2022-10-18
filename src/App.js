import './style.css';

function App() {

  const api = {
    token : '632e6d609944d6dfae45d1740b8ff66e',
    base : 'http://api.openweathermap.org/data/2.5/',
    lang : 'pt_br',
    units : 'metrics',
  }
 
  function searchResults(city, e){
    const searchInput = document.querySelector('input[type="text"]').value;

    fetch(`${api.base}weather?q=${searchInput}&lang=${api.lang}&units=${api.units}&APPID=${api.token}`).then(response => {
      if(!response.ok){
        throw new Error(`http error: status ${response.status}`)
      }
      return response.json();
    })
    .catch(error => {
      alert(error.message)
    })
    .then(response => {
      displayResults(response)
    })
  }
  
function displayResults(weather){
    const city = document.querySelector('.cidade');
    const date = document.querySelector('.data');
    const temp = document.querySelector('.temperatura');
    const clima = document.querySelector('.clima');
    const container = document.querySelector('.resultado');
    const data = new Date().getDate();
    const month = new Date().getMonth();
    const year = new Date().getFullYear();
    const fullDate = `${data}/${month}/${year}`

    city.innerText = `${weather.name}, ${weather.sys.country}`
    date.innerText = fullDate;
    temp.innerText =  `${Math.round(weather.main.temp - 273.15).toFixed(0)} °C`;
    clima.innerText = `${weather.weather[0].description}`;
    container.style.opacity = 1
  }
  

  return (
    <main>
      <div className="container">
        <h1 className="titulo">Clima Tempo</h1>
        <div className="container-busca">
          <input type="text" placeholder="Digite a cidade" className="city"></input>
          <button type="button" className="search-button" onClick={searchResults}>Pesquisar</button>
        </div>
        <div className="resultado">
          <span className="data"> </span>
          <h2 className="cidade"> </h2>
          <h1 className="temperatura"> </h1>
          <span className="clima"> </span>
        </div>
      </div>
    </main>
  );
}

export default App;
