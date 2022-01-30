console.log('WeatherAPI')

const getWeatherAPI = async function(userCity){
    let response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${userCity}&appid=SECRET_KEY`);
    let data = await response.json()
    console.log(data)
    return await data
}

const weatherForm = document.getElementById('weatherForm');

function generateResults(forecast){
    document.getElementById("weatherCard").innerHTML = "";

    let weatherCard = document.querySelector('#weatherCard');
    
    weatherCard.classList.add('card')
    weatherCard.style.width = '18rem'

    let weatherIcon = document.createElement('img')
    weatherIcon.classList.add('card-img-top')
    weatherIcon.src = `http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`
    weatherIcon.style.width = '100px'
    weatherIcon.style.height = '100px'
    weatherCard.append(weatherIcon)

    
    let cardBody = document.createElement('div')
    cardBody.classList.add('card-body')
    weatherCard.append(cardBody);

    let forecastHeading = document.createElement('h5')
    forecastHeading.classList.add('card-title')
    forecastHeading.innerText = `${forecast.name}`
    cardBody.append(forecastHeading)
    
    let cardText = document.createElement('p')
    cardText.classList.add('card-text')
    cardBody.append(cardText)
    
    let now = document.createElement('li');
    var today = new Date();
    var currentDate = (today.getMonth()+1)+'/'+today.getDate()+'/'+today.getFullYear();
    now.innerText = currentDate;
    cardText.append(now);

    let high = document.createElement('li');
    let fHigh = Math.round(((forecast.main.temp_max-273.15)*1.8+32))
    high.innerText = `High:  ${fHigh}\u00B0 F`;
    cardText.append(high);

    let low = document.createElement('li');
    let fLow = Math.round(((forecast.main.temp_min-273.15)*1.8+32))
    low.innerText = `Low:  ${fLow}\u00B0 F`;
    cardText.append(low)

    let conditions = document.createElement('li');
    conditions.innerText = `Condition:  ${forecast.weather[0].main}`;
    cardText.append(conditions)

    let humidity = document.createElement('li');
    humidity.innerText = `Humidity:  ${forecast.main.humidity}%`;
    cardText.append(humidity)

    let sunrise = document.createElement('li');
    var riseTime = new Date(forecast.sys.sunrise*1000)
    var rTime = riseTime.getHours() + ':' + riseTime.getMinutes()
    sunrise.innerText = `Sunrise:  ${rTime}`;
    cardText.append(sunrise)

    let sunset = document.createElement('li');
    var setTime = new Date(forecast.sys.sunset*1000)
    var sTime = setTime.getHours() + ':' + setTime.getMinutes()
    sunset.innerText = `Sunset:  ${sTime}`;
    cardText.append(sunset)
}

weatherForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    let city = e.target.userCity.value;
    console.log(city);
    let forecast = await getWeatherAPI(city);
    console.log(forecast);
    generateResults(forecast)
})