
/* Global Variables */
let CurrentDate = new Date();
let newDate = CurrentDate.getMonth() + 1 + '.' + CurrentDate.getDate() + '.' + CurrentDate.getFullYear();
const apiKey  ='c8f81e6534c5dd1d2021973dd8479d76&units=imperial';
const baseURL ='api.openweathermap.org/data/2.5/weather?';
//Create DOM vars
const zipInput = document.getElementById('zip');
const userInput = document.getElementById('feelings')
const dateHolder = document.getElementById('date')
const tempHolder = document.getElementById('temp')
const contentHolder = document.getElementById('content')
//Server.js Vars
const postURL = 'http://localhost:3030'
const getURL = 'http://localhost:3030/all'

// Call function to fetch via OpenWeatherMap
const getWeatherDataFromAPI = async (baseURL,zip, api) => {
  const url = `http://${baseURL}zip=${zip}&appid=${api}`
  const response = await fetch(url)
  try{
  let jsonResponse = await response.json()
  return jsonResponse
}
catch{
  console.log('error in fetching')
}
}

//  Post data function into Server.js
const postData = async (path, data = {}) => {
  const response = await fetch(path, {
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    body: JSON.stringify(data), 
  })
}

// Update UI function 
const updateUI = async () => {
  //Get data function from Server.js
  const response = await fetch(getURL)
  const jsonResponse = await response.json()
  dateHolder.innerHTML = `Date: ${jsonResponse.date}`
  tempHolder.innerHTML = `Temperature: ${jsonResponse.temperature}`
  contentHolder.innerHTML = `You feel: ${jsonResponse.userResponse}`
}

// Event handler 
const generateBtnClicked = async () => {
  const weatherData = await getWeatherDataFromAPI(baseURL, zipInput.value, apiKey)
  const data = {
    temperature: weatherData.main.temp,
    date: newDate,
    userresponse: userInput.value
  }
  await postData(postURL, data)
  updateUI()
}

// Add element event listener with 'generate' id
const generateBtn = document.getElementById('generate')
generateBtn.addEventListener('click', generateBtnClicked)