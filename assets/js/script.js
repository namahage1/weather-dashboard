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
    .then((result) => {


        console.log(result);

        const selectedData = [
            result.list[0],
            result.list[8],
            result.list[16],
            result.list[24],
            result.list[32],
        ]

        console.log(selectedData)




        for([i,s] of selectedData.entries()){
            console.log(s.dt_txt);


            // <div class="card" style="width: 18rem;">
            //     <div class="card-header">
            //         04 08 2024
            //     </div>
            //     <img src="https://openweathermap.org/img/wn/10d@2x.png"/>
            //     <ul class="list-group list-group-flush">
            //         <li class="list-group-item">Temp: </li>
            //         <li class="list-group-item">Humidity: </li>
            //         <li class="list-group-item">Wind Speed: </li>
            //     </ul>
            // </div>
            const newCardDiv = document.createElement("div");
            newCardDiv.classList.add("card");
            newCardDiv.setAttribute("style", "width: 18rem;")

            const newDateDiv = document.createElement("div");
            newDateDiv.classList.add("card-header");
            newDateDiv.textContent = s.dt_txt

            newCardDiv.append(newDateDiv);


            // create iamge
            const newCardImg = document.createElement("img");
            newCardImg.setAttribute("src", "https://openweathermap.org/img/wn/"+s.weather[0].icon+"@2x.png")

            newCardDiv.append(newCardImg);

            const newCardUl = document.createElement("ul");
            newCardUl.classList = "list-group list-group-flush"
            // newCardUl.classList.add("list-group")
            // newCardUl.classList.add("list-group-flush")

            const newCardTmpLi = document.createElement("li");
            newCardTmpLi.classList.add("list-group-item");
            newCardTmpLi.textContent = "Temp: " + s.main.temp;

            const newCardHumLi = document.createElement("li");
            newCardHumLi.classList.add("list-group-item");
            newCardHumLi.textContent = s.main.humidity;

            const newCardWindLi = document.createElement("li");
            newCardWindLi.classList.add("list-group-item");
            newCardWindLi.textContent = s.wind.speed;

            newCardUl.append(newCardTmpLi)
            newCardUl.append(newCardHumLi)
            newCardUl.append(newCardWindLi)

            newCardDiv.append(newCardUl)

            document.getElementById("forecast-container").append(newCardDiv)

        }


        // render the data into the page
        const myH1 = document.getElementById("searched-city")
        myH1.textContent = result.city.name

        // dayjs('2019-01-25').format('DD/MM/YYYY')
        // const todayDate = document.getElementById("today-date");
        // // todayDate.textContent = dayjs().add(1, "day").format('DD/MM/YYYY')
        // todayDate.textContent = dayjs().add(0, "day").format('DD/MM/YYYY')


    })
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