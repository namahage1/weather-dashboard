let cityName = "Castle Rock";//default just in case does not show up
let inputCityEl = document.querySelector('#search-field');
const apiKey = "657dd3403e0d0b938737ea9d758485c0";
let forecastList = JSON.parse(localStorage.getItem("forecast_history")) || [];
let currentWeatherList = JSON.parse(localStorage.getItem("currentWeather_history")) || [];


const requestOptions = {
  method: "GET",
  redirect: "follow"
};

//after button click then display city weather again
function getSearchHistory(container) {

  const historyBtn = document.createElement("button");
  historyBtn.classList.add("btn");
  historyBtn.classList.add("btn-secondary");
  historyBtn.classList.add("btn-sm");
  historyBtn.classList.add("hty-btn");

  historyBtn.setAttribute("onclick", citySearchHandler);

  historyBtn.textContent = cityName;
  container.append(historyBtn);
  return container;
}
// function displayStoredCityWeather(city) {

//   //TODO: clear the previous contents

//   getCoords(city);
// }

function setSearchHistory(forecast, today) {

  if (forecast) {

    forecastList.push(forecast);
    localStorage.setItem('forecast_history', JSON.stringify(forecastList));
  }
  if (today) {
    currentWeatherList.push(today);
    localStorage.setItem('currentWeather_history', JSON.stringify(currentWeatherList));
  }


}
const citySearchHandler = function (event) {
  event.preventDefault();
  clearElements("omaewokesu");
  cityName = document.getElementById('city_name').value;
  if (cityName) {
    getCoords(cityName);
  } else {
    alert('Please enter a city name');
  }
  const listOfHstBtn = document.getElementById("list-hst-btn");
  getSearchHistory(listOfHstBtn);

  document.getElementById('search-field').reset();
}

//clear the contents or it will show up with current search
function clearElements(id) {
  const parentDOM = document.getElementById(id);

  if (parentDOM) {
    let child = parentDOM.lastElementChild;
  //  console.log(parentDOM);
    while (child) {
      parentDOM.removeChild(child);
      child = parentDOM.lastElementChild;
    }

    //  parentDOM.innerHTML = "";
  } else
    console.log("empty element");
}
/*
to do: get the city name when user click the one of the history buttons then render the city again
*/

function getCurrentWeather(lat, lon) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      setSearchHistory(null, result);
      let citynameInputEl = document.getElementById("city");
      citynameInputEl.textContent = "Today's " + result.name;

      clearElements("today-area");
      const todayWeatherImg = document.createElement("img");
      todayWeatherImg.setAttribute("src", "https://openweathermap.org/img/wn/" + result.weather[0].icon + "@2x.png");
      const todayArea = document.getElementById("today-area");
      todayArea.append(citynameInputEl);
      todayArea.append(todayWeatherImg);
      const tmp = document.createElement("div");
      tmp.textContent = "Temp : " + result.main.temp + " F ";
      const humid = document.createElement("div");
      humid.textContent = "Humidity : " + result.main.humidity + " % ";
      const wind = document.createElement("div");
      wind.textContent = "Wind : " + result.wind.speed + " MPH ";
      todayArea.append(tmp);
      todayArea.append(humid);
      todayArea.append(wind);
    })

}
//TODO: fix appeding to previous search
function getForcast(lat, lon) {
  fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      setSearchHistory(result, null);

      const selectedData = [
        result.list[0],
        result.list[8],
        result.list[16],
        result.list[24],
        result.list[32],
      ]

      const newCardDiv = document.createElement("div");//<div class="card">

      newCardDiv.classList.add("card");
      newCardDiv.setAttribute("style", "width: 18rem;")

      for ([i, s] of selectedData.entries()) {

        //TODO:Delete counters
        let counter=0;counter+=1;
        console.log("counter " + counter );
        const newDateDiv = document.createElement("div"); //<div class="card-header"></div>
        newDateDiv.classList.add("card-header");
        newDateDiv.textContent = dayjs(s.dt_txt).format('MM/DD/YYYY'); //displays date

        newCardDiv.append(newDateDiv); //now  <div class="card" style="width: 18rem;">
        //       <div class="card-header">


        // create iamge
        const newCardImg = document.createElement("img");
        newCardImg.setAttribute("src", "https://openweathermap.org/img/wn/" + s.weather[0].icon + "@2x.png")

        newCardDiv.append(newCardImg); //<div class="card" style="width: 18rem;">
        //          <img src=...>

        const newCardUl = document.createElement("ul");
        newCardUl.classList = "list-group list-group-flush";

        const newCardTmpLi = document.createElement("li");
        newCardTmpLi.classList.add("list-group-item");
        newCardTmpLi.textContent = "Temp: " + s.main.temp + " F";

        const newCardHumLi = document.createElement("li");
        newCardHumLi.classList.add("list-group-item");
        newCardHumLi.textContent = "Humidity: " + s.main.humidity + " %";

        const newCardWindLi = document.createElement("li");
        newCardWindLi.classList.add("list-group-item");
        newCardWindLi.textContent = "Wind : " + s.wind.speed + " MPH";

        newCardUl.append(newCardTmpLi); //<ul> <li>
        newCardUl.append(newCardHumLi);
        newCardUl.append(newCardWindLi);

        newCardDiv.append(newCardUl);//<div class="card" style="width: 18rem;">
        //   <ul><li>

      }
        let myH1 = null;
    
        const omaewokesu = document.getElementById("omaewokesu");
        omaewokesu.setAttribute('id', 'omaewokesu');

        myH1 = document.createElement("h2");
        myH1.setAttribute("id", "searched-city");
      myH1.textContent = "5 day forcast: " + result.city.name; //display searched city on the element of <h1 id=searched-city>
      omaewokesu.append(myH1);
      omaewokesu.append(newCardDiv);
      const mainContainer = document.getElementById("forecast-container");

      if (mainContainer) {
        mainContainer.append(omaewokesu);
      } else {
        console.log("forecast-container is null");
      }

      let todayWeather = getCurrentWeather(lat, lon);

    })
    .catch((error) => console.error(error));
}


function getCoords(city = cityName) {
  //get coordinate using city name    
  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&limit=1&appid=${apiKey}`, requestOptions)
    .then((response) =>
      response.json())
    .then((result) =>
      getForcast(result.city.coord.lat, result.city.coord.lon))
    .catch((error) => alert("city name does not exit"));
}

getCoords()//render the first time
inputCityEl.addEventListener('submit', citySearchHandler);
