const request = require('request')

// Add query strings to the url using the ? followed by key=value pairs. Use the & sign to add multiple key=value pairs in the query string.
const url = 'https://api.darksky.net/forecast/774f2be3dbdbff72e8bab9cf673a2e70/37.8267,-122.4233?units=si&lang=en'

request({url: url, json: true}, (err, response) => {
   // console.log(response.body.currently)

   console.log(response.body.daily.data[0].summary + ' It is currently ' + response.body.currently.temperature + ' degrees out. There is a ' + response.body.currently.precipProbability + '% chance of rain.')
})


///////////////////////////////////////////////////////
// CHALLENGE - Print a small forecast to the user
///////////////////////////////////////////////////////
// 1. Print: "It is currently 58.55 degrees out. There is a 0% chance of rain."
// 2. Use the temperature and precipProbability properties to dynamically replace the forecast values for the location in our printed message.
// 3. Test your work! 


///////////////////////////////////////////////////////
   // SOLUTION
///////////////////////////////////////////////////////
// The request function code block would have the following:
// console.log('It is currently ' + response.body.currently.temperature + ' degrees out. There is a ' + response.body.currently.precipProbability + '% chance of rain.')
// Run node app.js command in the terminal to test the work.