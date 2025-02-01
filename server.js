
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";



const env = dotenv.config();
const app = express()
const port = 3000
const weather = process.env.WEATHER_API
const AI_API = process.env.API_KEY
const genAI = new GoogleGenerativeAI(AI_API);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


app.use(cors({
    origin: 'http://127.0.0.1:5500'
  }));

app.get('/', (req, res) => {
  res.send('working fine')
})


  app.get('/weather',async (req, res) => {
      var place = req.query.city
      
      var response = fetch('http://api.weatherapi.com/v1/current.json?key='+ weather +'&q=' + place +'&aqi=yes')
      .then(response => response.json()) 
    .then(async data => {
      JSON.stringify(data)
      const Loc_data = JSON.stringify(data)
     // res.send(data)
      const prompt = "here's the weather information of my city"+Loc_data+"can you provide ai based summary of this weather information generate summary around 70-90 words.suggest where to go , what to wear, what to eat, best time to go outside suggest things as a friend and end this with a qoute related to weather and motivation  and greeting"
      const result = await model.generateContent(prompt);
      console.log(result.response.text());
      
      res.json({
        weather: data,
        ai_summary: result.response.text()

      }
    )});
      
  })

  app.get('/weatherwithoutai',async (req, res) => {
    var place = req.query.city
    
    var response = fetch('http://api.weatherapi.com/v1/current.json?key='+ weather +'&q=' + place +'&aqi=yes')
    .then(response => response.json()) 
  .then(async data => {
    JSON.stringify(data)
    const Loc_data = JSON.stringify(data)
   res.send(data)
  })})







app.listen(port, () => {


    console.log(`Example app listening on port ${port}`)

    console.log(weather)
    
  })
