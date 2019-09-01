const request = require('request')

const url = 'https://api.darksky.net/forecast/774f2be3dbdbff72e8bab9cf673a2e70/37.8267,-122.4233?units=si&lang=en'

request({url: url, json: true}, (err, response) => {
   console.log(response.body.daily.data[0].summary + ' It is currently ' + response.body.currently.temperature + ' degrees out. There is a ' + response.body.currently.precipProbability + '% chance of rain.')
})


///////////////////////////////////////////////////////
// CHALLENGE - Print the lat/long for London
///////////////////////////////////////////////////////
// 1. Fire off a new request to the Mapbox URL
// 2. Have the request module parse it as JSON
// 3. Print both the latitude and longitude to the terminal
// 4. Test your Work!


///////////////////////////////////////////////////////
   // SOLUTION
///////////////////////////////////////////////////////
const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/London.json?access_token=pk.eyJ1IjoieXR1YmUtdHV0b3JpYWxzIiwiYSI6ImNrMDFhaHNiNTBvYnczbXF0bm15aXVxNnQifQ.F9o3SEHg8NI0-qQS5Gt8ng&limit=1'

request({url: geocodeURL, json: true}, (err, response) => {
   const longitude = response.body.features[0].center[0]
   const latitude = response.body.features[0].center[1]

   console.log(latitude, longitude)
})

// Run node app.js command in the terminal.