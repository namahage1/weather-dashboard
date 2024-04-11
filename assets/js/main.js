const citynameInputEl = document.querySelector('#cityname');

const formSubmitHandler = function (event) {
    event.preventDefault();
  
    const cityname = citynameInputEl.value.trim();
  
    if (cityname) {
        getWeatherApi(cityname);

    } else {
      alert('Please enter a City name');
    }
  };

  const getWeatherApi = function (user) {
    const apiUrl = `https://api.github.com/users/${user}/repos`;
  
    fetch(apiUrl)
      .then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            displayRepos(data, user);
          });
        } else {
          alert(`Error:${response.statusText}`);
        }
      })
      .catch(function (error) {
        alert('Unable to connect to Weather API');
      });
  };
  const displayWeather = function (apis, searchTerm) {
    if (apis.length === 0) {
    console.log("error");
      return;
    }
}