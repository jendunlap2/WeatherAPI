console.log('WeatherAPI')

const getWeatherAPI = async function(cityLocation){
    let response = await fetch(`api.openweathermap.org/data/2.5/weather?q=${cityLocation}&appid=SECRET_KEY`);
    let data = await response.json();
    return await data;
}

const weatherForm = document.getElementById('weatherForm');

function generateResults(forecast){
    let weatherList = document.querySelector('#weatherList');
    
    let high = document.createElement('li');
    high.innerText = `${forecast.main.temp_max}`;
    weatherList.append(high);

    let low = document.createElement('li');
    low.innerText = `${forecast.main.temp_min}`;
    weatherList.append(low)

    let conditions = document.createElement('li');
    conditions.innerText = `${forecast.weather[0].main}`;
    weatherList.append(conditions)

    let humidity = document.createElement('li');
    humidity.innerText = `${forecast.main.humidity}`;
    weatherList.append(humidity)
}

weatherForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    let city = e.target.cityLocation;
    console.log(city);
    let forecast = await getWeatherAPI(city);
    console.log(forecast);
    generateResults(forecast);
});