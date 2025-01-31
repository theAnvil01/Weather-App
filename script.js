

    
function getWeather() {

    const location = document.getElementById("location").value;
    fetch('http://127.0.0.1:3000/weather?city='+ location)
    .then(response => response.json())
  .then(data => {
    const locationName = data.location.name; // 'Bhopal'
    const region = data.location.region; // 'Madhya Pradesh'
    const country = data.location.country; // 'India'
    const localtime = data.location.localtime; // '2025-01-21 19:16'

    const tempC = data.current.temp_c; // 20.8°C
    const conditionText = data.current.condition.text; // 'Clear'
    const icon = data.current.condition.icon; // Icon URL
    const humidity = data.current.humidity; // 44%
    const windKph = data.current.wind_kph;
    ; 
    const html = `
  <h2><b>Weather of: </b>  ${locationName}, ${region}, ${country}</h2>
  <p><b>Local Time:</b> ${localtime}</p>
  <p><b>Temperature:</b> ${tempC}°C</p>
  <p><b>Condition:</b> ${conditionText}<b1> </b1><img class="icon" src="https:${icon}" alt="${conditionText}"></p>
    <p><b>Humidity:</b> ${humidity}%</p>
  <p><b>Wind Speed:</b> ${windKph} km/h</p>
  <p><b>AQI:</b> ${data.current.air_quality.o3}</p>
`;
  

 document.getElementById("result").innerHTML = html;
    ;

  })

.catch(error => {
   
   // window.location.replace("./404.html");

    console.log("there is an error code : ", error);
  })



}