const cityName = "Oklahoma City";
const apiKey = "657dd3403e0d0b938737ea9d758485c0";
const coordinates = {
    lat: 35.47,
    lon: -97.51,
};

const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  


function getForcast(lat, lon){
  fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`, requestOptions)
    .then((response) => response.json())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}

function getCoords(city = cityName){
    //get coordinate using city name   
    console.log("meow");    
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&limit=1&appid=${apiKey}`, requestOptions)
    .then((response) => response.json())
  .then((result) => getForcast(result.city.coord.lat,result.city.coord.lon))
    .catch((error) => console.error(error));
}
getCoords()
//need to get city name from form to function
//show the forcast on the screen
//store in local storage