const express = require("express")
const env = require('dotenv').config();
const app = express()
const port = 3000
const weather = process.env.WEATHER_API
const cors = require('cors');

app.use(cors({
    origin: 'http://127.0.0.1:5500' // Allow only this origin
  }));

app.get('/', (req, res) => {
  res.send('working fine')
})

app.get('/weather', (req, res) => {
    var place = req.query.city
    
    var response = fetch('http://api.weatherapi.com/v1/current.json?key='+ weather +'&q=' + place +'&aqi=yes')
    .then(response => response.json()) 
  .then(data => {
    JSON.stringify(data)
    res.send(data)
})
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
    console.log(env)
    console.log(weather)
    
  })