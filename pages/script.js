 const time1 = document.getElementById('time');
const date1 = document.getElementById('date');
const currentWeatherItem = document.getElementById('current-weather-items');
const timezone = document.getElementById('timezone');
const country1 = document.getElementById('country');
const weatherForecast = document.getElementById('weather-forecast');
const currentTemp1 = document.getElementById('current-temp');



const days = ['Sunday', 'Monday', 'Tuesday', 'Wednsday', 'Thursday', 'Friday', 'Saturday'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov','Dec'];

const API = '7d789f8859208c36ca761b51af53689e';

setInterval(() => {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const hoursIn12Time = hour >= 13 ? hour %12: hour
    const min = time.getMinutes();
    const ampm = hour >= 12 ? 'PM' : 'AM'

    time1.innerHTML =  hoursIn12Time +':' +(min < 10? `0` + min: min)+' '+ ` <span id="am-pm">${ampm}</span>`

    date1.innerHTML  = days[day] + ', ' + date + ' ' + months[month]
}, 1000);

getWeatherData()

function getWeatherData(){
    navigator.geolocation.getCurrentPosition((success) => {
      console.log(success);
        let {latitude,longitude } =  success.coords;

        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API}`).then(res => res.json()).then(data =>{ 
            
            showWeatherData(data);
        })
    })
    
}


function showWeatherData(data){
  let {humidity, pressure, sunrise, sunset, wind_speed} = data.current; 

  time1.innerHTML = data.timezone;
  country1.innerHTML = data.lat + 'N' + data.lon + 'E'  

  currentWeatherItem.innerHTML = `<div class="weather-items">
  <div>Humidity</div>
  <div>${humidity} %</div>
</div>
<div class="weather-items">
  <div>Pressure</div>
  <div>${pressure}</div>
</div>
<div class="weather-items">
  <div>Wind Speed</div>
  <div>${wind_speed}</div>
</div>
  <div class="weather-items">
  <div>Sunrise</div>
  <div>${window.moment(sunrise * 1000).format('HH:mm a')}</div>
</div>  
  <div class="weather-items">
  <div>SunSet</div>
  <div>${window.moment(sunset * 1000).format('HH:mm a')}</div>
</div>  
 `;


let otherForecast = ''
 
data.daily.forEach((day, idx) => {
       
         if(idx == 0){
           currentTemp1.innerHTML = `<div class="today-others2">
           <div class="today" id="current-temp">
             <img
               src="./images/Weathericon.png"
               alt="weather-icon"
               class="w-icon"
             />
           </div>
           <div class="weather-forecast">
             <div class="others2">
               <div class="day">Monday</div>
               <div class="temp">Night - ${day.temp.night}&#176; C</div>
               <div class="temp">Day - ${day.temp.day}&#176; C</div>
             </div>
           </div>
         </div>`
        } else{
          otherForecast += `
          <div class="weather-forecast-item">
          <div class="day">${window.moment(day.dt * 1000).format('ddd')}</div>
          <img
            src="./images/Weathericon.png"
            alt="weather-icon"
            class="w-icon"
          />
          <div class="temp">Night - ${day.temp.night}&#176; C</div>
          <div class="temp">Day - ${day.temp.day}&#176; C</div>
        </div>
        `


        }
})
        weatherForecast.innerHTML = otherForecast;
 
}

